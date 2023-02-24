import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faSliders, faBookOpen, faListSquares, faHourglassStart, faCheck, faUser, faArrowRightArrowLeft, faCalendar, faCaretRight, faCaretLeft, faRefresh, faFilePdf, faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, Subscription } from 'rxjs';
import { DashboardService } from './dashboard.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ViewDocumentService } from '../view-spdocument/view-document.service';
import Swal from 'sweetalert2';
import { KeycloakService } from 'keycloak-angular';
import { HeaderService } from 'src/app/shared/components/header/header.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  value: any = 123;
  faSliders = faSliders;
  faBookOpen = faBookOpen;
  faListSquares = faListSquares;
  faHourglassStart = faHourglassStart;
  faCheck = faCheck;
  faUser = faUser;
  faArrowRightArrowLeft = faArrowRightArrowLeft;
  faCalendar = faCalendar;
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;
  faRefresh = faRefresh;
  faFilePdf = faFilePdf;
  faCircleDown = faCircleDown;

  //Order By
  created_at: String = 'desc';
  status_order: String = 'desc';
  shipping_no_order: String = 'desc';
  sender_date_order: String = 'desc';
  receiver_date_order: String = 'desc';
  status: String = "%%"

  all: boolean = true;
  open: boolean = false;
  delivered: boolean = false;

  obs!: Subscription;

  data!: any;
  countAll!: Number;
  countOpen!: Number;
  countDelivered!: Number;

  dataShow: any;

  id_sp_doc!: Number;

  pagination: {
    no: number;
  }[] = [];

  length!: number;
  page: number = 1;
  limit: number = 10;
  per_page!: number;
  long_page!: number;
  isActive: any;


  //Data PDF
  link_image: String = '/assets/gmf-logo.webp'
  sp_no: any;
  sender_by: any;
  receiver: any;
  sender: any;
  sender_name: any;
  sender_number: any;
  sender_date: any;

  receive_name: any;
  receive_number: any;
  receive_date: any;
  data_pdf: any;
  personal_number!: string;
  user: any;

  constructor(
    private dashboardService: DashboardService,
    private viewdocumentService: ViewDocumentService,
    private keycloakService: KeycloakService,
    private headerService: HeaderService,
  ) { }

  mform: FormGroup = new FormGroup({
    search_global: new FormControl(''),
    limit: new FormControl(this.limit),
    page: new FormControl(this.page),
    status: new FormControl(this.status),
    created_at: new FormControl(this.created_at),
    status_order: new FormControl(''),
    shipping_no_order: new FormControl(''),
    sender_date_order: new FormControl(''),
    receiver_date_order: new FormControl(''),
    updated_at: new FormControl(''),
    sender_unit: new FormControl(''),
    receiver_unit: new FormControl(''),
  });

  ngOnInit() {
    this.initializeUserOptions()
    this.getUserData(this.personal_number)
    this.getCountAllTotal();
    this.getCountOpenTotal();
    this.getCountDeliveredTotal();
    this.obs = this.mform.valueChanges
      .pipe(debounceTime(500)).subscribe(
        () => {
          if (this.mform.get('page')?.value < 1) {
            this.mform.get('page')?.setValue(1)
          }
          this.paginate()
          this.getDataDocument(
            this.mform.get('limit')?.value,
            this.per_page,
            this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
            this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
            this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
            this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
            this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
            this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
            this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
            'Delivered',

            this.mform.get('created_at')?.value == '' ? '' : this.mform.get('created_at')?.value,
            this.mform.get('status_order')?.value == '' ? '' : this.mform.get('status_order')?.value,
            this.mform.get('shipping_no_order')?.value == '' ? '' : this.mform.get('shipping_no_order')?.value,
            this.mform.get('sender_date_order')?.value == '' ? '' : this.mform.get('sender_date_order')?.value,
            this.mform.get('receiver_date_order')?.value == '' ? '' : this.mform.get('receiver_date_order')?.value,
            this.mform.get('updated_at')?.value == '' ? '' : this.mform.get('updated_at')?.value,
          )
        }
      )
  }
  public showDocumentPDF(id_sp_data: number) {
    this.viewdocumentService.getShowData(id_sp_data)
      .subscribe(
        (response) => {
          this.sp_no = response.spdoc_data_by_pk.shipping_no
          this.data_pdf = response.spdoc_data_by_pk.spdoc_description_remarks
          this.receiver = response.spdoc_data_by_pk.receiver_unit
          this.sender = response.spdoc_data_by_pk.sender_unit
          this.sender_name = response.spdoc_data_by_pk.sender_personal_name
          this.sender_number = response.spdoc_data_by_pk.sender_personal_number
          this.sender_date = response.spdoc_data_by_pk.sender_date
          this.receive_name = response.spdoc_data_by_pk.receiver_personal_name
          this.receive_number = response.spdoc_data_by_pk.receiver_personal_number
          this.receive_date = response.spdoc_data_by_pk.receive_date
        }
      )
  }

  public openPDF(id_sp_data: any = this.sp_no): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        compress: true,
        format: 'b3',
        unit: 'pt'
      })
      const pdfw = pdf.internal.pageSize.getWidth()
      const pdfh = pdf.internal.pageSize.getHeight();


      // const pdfh = (imageProps.height * pdfw) / imageProps.width
      pdf.setFontSize(12);
      pdf.addImage(imageData, 'PNG', 0, 0, pdfw, pdfh)

      pdf.save('SP-' + id_sp_data + '.pdf');
    });
  }

  public resetSearch() {
    this.mform.get('limit')?.setValue(10)
    this.mform.get('page')?.setValue(1)

    this.mform.get('search_global')?.setValue('')
    this.mform.get('created_at')?.setValue('desc')
    this.mform.get('status_order')?.setValue('')
    this.mform.get('shipping_no_order')?.setValue('')
    this.mform.get('sender_date_order')?.setValue('')
    this.mform.get('receiver_date_order')?.setValue('')
    this.mform.get('updated_at')?.setValue('')
  }

  public getByCreated() {
    this.mform.get('created_at')?.setValue('desc')
    this.mform.get('status_order')?.setValue('')
    this.mform.get('shipping_no_order')?.setValue('')
    this.mform.get('sender_date_order')?.setValue('')
    this.mform.get('receiver_date_order')?.setValue('')
    this.mform.get('updated_at')?.setValue('')
  }
  public getByUpdated() {
    this.mform.get('created_at')?.setValue('')
    this.mform.get('status_order')?.setValue('')
    this.mform.get('shipping_no_order')?.setValue('')
    this.mform.get('sender_date_order')?.setValue('')
    this.mform.get('receiver_date_order')?.setValue('')
    this.mform.get('updated_at')?.setValue('desc')
  }

  public nextPage() {
    this.mform.get('page')?.setValue(this.mform.get('page')?.value + 1)
  }

  public prevPage() {
    this.mform.get('page')?.setValue(this.mform.get('page')?.value - 1)
  }

  //TOTAL
  public getCountAllTotal(cat_status: String = "%%"): void {
    this.dashboardService.getCountCard(cat_status)
      .subscribe(
        (response) => {
          this.countAll = response.spdoc_data_aggregate.aggregate.count
        }
      )
  }
  public getCountOpenTotal(cat_status: String = "Open"): void {
    this.dashboardService.getCountCard(cat_status)
      .subscribe(
        (response) => {
          this.countOpen = response.spdoc_data_aggregate.aggregate.count
        }
      )
  }
  public getCountDeliveredTotal(cat_status: String = "Delivered"): void {
    this.dashboardService.getCountCard(cat_status)
      .subscribe(
        (response) => {
          this.countDelivered = response.spdoc_data_aggregate.aggregate.count
        }
      )
  }

  public paginate(): void {
    if (this.mform.get('page')?.dirty || this.mform.get('limit')?.dirty) {
      this.per_page = (this.mform.get('page')?.value - 1) * this.mform.get('limit')?.value
    } else {
      this.per_page = (this.mform.get('page')?.value - 1) * this.mform.get('limit')?.value
    }
  }

  public getCountData(): void {
    this.long_page = this.length / this.mform.get('limit')?.value
    this.long_page = Math.ceil(this.long_page)
    this.pagination = []
    for (let i = 0; i < this.long_page; i++) {
      this.pagination.push({
        no: i + 1
      })
    }
  }

  public sortALL(): void {
    this.mform.get('page')?.setValue(1); this.mform.get('status')?.setValue('%%');
    this.all = true
    this.open = false
    this.delivered = false
  }

  public sortOPEN(): void {
    this.mform.get('page')?.setValue(1); this.mform.get('status')?.setValue('Open');
    this.all = false
    this.open = true
    this.delivered = false
  }

  public sortDELIVERED(): void {
    this.all = false
    this.open = false
    this.delivered = true
    this.mform.get('page')?.setValue(1); this.mform.get('status')?.setValue('Delivered')
  }

  public noPage(no: number) {
    this.mform.get('page')?.setValue(no)
  }

  public getDataDocument(
    limit: number,
    offset: number,
    sender_personal_name: any,
    sender_personal_number: any,
    shipping_no: any,
    receiver_personal_name: any,
    receiver_personal_number: any,
    sender_unit: any,
    receiver_unit: any,
    status: any,
    created_at: any,
    status_order: any,
    shipping_no_order: any,
    sender_date_order: any,
    receiver_date_order: any,
    updated_at: any,
  ): void {
    this.dashboardService.getDataDocument(
      limit,
      offset,
      sender_personal_name,
      sender_personal_number,
      shipping_no,
      receiver_personal_name,
      receiver_personal_number,
      sender_unit,
      receiver_unit,
      status,
      created_at,
      status_order,
      shipping_no_order,
      sender_date_order,
      receiver_date_order,
      updated_at,
    ).subscribe(
      (response) => {
        this.data = response.spdoc_data
        this.length = response.spdoc_data_aggregate.aggregate.count
        this.getCountData()
      }
    )
  }

  //GET Personal Number from Keycloak
  private initializeUserOptions(): void {
    this.personal_number = this.keycloakService.getUsername();
  }

  //Get Personal Info from SOE
  private getUserData(personal_number: any): void {
    this.headerService.getUserData(personal_number)
      .subscribe(
        (response) => {
          this.user = response
        }
      )
  }

  public confirmReceive(
    id_sp_data: any,
  ): void {
    Swal.fire({
      title: 'Receive it?',
      text: 'Do you want to receive it?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Receive',
    }).then((result) => {
      if (result.isConfirmed) {
        const now = new Date()
        const date = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()
        let longdate
        if (month.toString().length == 1) {
          longdate = year + '-' + '0' + month + '-' + date
        } else {
          longdate = year + '-' + month + '-' + date
        }
        this.receiveSP(
          id_sp_data,
          this.user.personalNumber,
          this.user.personalName,
          longdate,
        ),
          Swal.fire({
            icon: 'success',
            title: 'Received',
            text: 'Document has Received!',
            showConfirmButton: false,
            timer: 1500
          }).then(
            () => {
              this.loadData()
            }
          )
      }
    })
  }
  public receiveSP(
    id_sp_data: any,
    receiver_personal_number: any,
    receiver_personal_name: any,
    receiver_date: any,
  ): void {
    this.dashboardService.receiveDocument(
      id_sp_data,
      receiver_personal_number,
      receiver_personal_name,
      receiver_date,
    ).subscribe((response) => {
      return response
    })
  }

  public loadData(): void {
    this.getCountAllTotal();
    this.getCountOpenTotal();
    this.getCountDeliveredTotal();
    this.paginate()
    this.getDataDocument(
      this.mform.get('limit')?.value,
      this.per_page,
      this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
      this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
      this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
      this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
      this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
      this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
      this.mform.get('search_global')?.value == '' ? '%%' : '%' + this.mform.get('search_global')?.value + '%',
      this.mform.get('status')?.value == '' ? '%%' : '%' + this.mform.get('status')?.value + '%',

      this.mform.get('created_at')?.value == '' ? '' : this.mform.get('created_at')?.value,
      this.mform.get('status_order')?.value == '' ? '' : this.mform.get('status_order')?.value,
      this.mform.get('shipping_no_order')?.value == '' ? '' : this.mform.get('shipping_no_order')?.value,
      this.mform.get('sender_date_order')?.value == '' ? '' : this.mform.get('sender_date_order')?.value,
      this.mform.get('receiver_date_order')?.value == '' ? '' : this.mform.get('receiver_date_order')?.value,
      this.mform.get('updated_at')?.value == '' ? '' : this.mform.get('updated_at')?.value,
    )
  }

  ngOnDestroy() {
    this.getCountAllTotal();
    this.getCountOpenTotal();
    this.getCountDeliveredTotal();
  }
}
