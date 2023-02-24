import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faBookOpen, faEye, faEllipsisVertical, faFilePdf, faPencilSquare, faFileInvoice, faCircleDown, faCircleCheck, faCaretLeft, faCaretRight, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, Subscription } from 'rxjs';
import { ViewDocumentService } from '../view-spdocument/view-document.service';
import { DocumentListService } from './document-list.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DashboardService } from '../dashboard/dashboard.service';
import Swal from 'sweetalert2';
import { KeycloakService } from 'keycloak-angular';
import { HeaderService } from 'src/app/shared/components/header/header.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  faEye = faEye;
  faBookOpen = faBookOpen;
  faEllipsisVertical = faEllipsisVertical;
  faPencilSquare = faPencilSquare;
  faFileInvoice = faFileInvoice;
  faCircleCheck = faCircleCheck;
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  faCircleDown = faCircleDown;
  faFilePdf = faFilePdf;

  Show: boolean = false

  data!: any;

  obs!: Subscription;

  length!: number;
  limit: number = 10;
  page: number = 1;
  per_page!: number;
  long_page!: number;

  personal_number!: string;
  user: any;

  pagination: {
    no: number;
  }[] = [];

  mform: FormGroup = new FormGroup({
    shipping_no: new FormControl(),

    sender_personal_number: new FormControl(),
    sender_personal_name: new FormControl(),
    sender_unit: new FormControl(),
    sender_date: new FormControl(),

    receiver_personal_number: new FormControl(),
    receiver_personal_name: new FormControl(),
    receiver_unit: new FormControl(),
    receiver_date: new FormControl(),

    description: new FormControl(),
    status: new FormControl(),

    limit: new FormControl(this.limit),
    page: new FormControl(this.page),

    shipping_no_order: new FormControl(),
    sender_personal_number_order: new FormControl(),
    sender_personal_name_order: new FormControl(),
    sender_date_order: new FormControl(),
    receiver_personal_number_order: new FormControl(),
    receiver_personal_name_order: new FormControl(),
    receiver_date_order: new FormControl(),
    receiver_unit_order: new FormControl(),
    sender_unit_order: new FormControl(),
  });

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

  constructor(
    private dashboardService: DashboardService,
    private documentlistService: DocumentListService,
    private router: Router,
    private viewdocumentService: ViewDocumentService,
    private keycloakService: KeycloakService,
    private headerService: HeaderService,
  ) { }


  ngOnInit() {
    this.initializeUserOptions()
    this.getUserData(this.personal_number)
    this.obs = this.mform.valueChanges
      .pipe(debounceTime(500)).subscribe(
        (data) => {
          if(data.page < 1) {
            this.mform.get('page')?.setValue(1)
          }
          if (data.sender_date == null && data.receiver_date == null) {
            this.paginate()
            this.filterSearch(
              data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
              data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
              data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
              data.sender_unit == null ? '%%' : "%" + data.sender_unit + "%",
              data.receiver_personal_number == null ? '%%' : '%%' + data.receiver_personal_number + "%",
              data.receiver_personal_name == null ? '%%' : '%%' + data.receiver_personal_name + "%",
              data.receiver_unit == null ? '%%' : '%%' + data.receiver_unit + "%",
              data.description == null ? '%%' : "%" + data.description + "%",
              data.status == null ? '%%' : "%" + data.status + "%",
              data.limit == null ? this.limit : data.limit,
              this.per_page,
              data.shipping_no_order == null ? 'desc' : data.shipping_no_order,
              data.sender_personal_number_order == null ? '' : data.sender_personal_number_order,
              data.sender_personal_name_order == null ? '' : data.sender_personal_name_order,
              data.sender_date_order == null ? '' : data.sender_date_order,
              data.receiver_personal_number_order == null ? '' : data.receiver_personal_number_order,
              data.receiver_personal_name_order == null ? '' : data.receiver_personal_name_order,
              data.receiver_date_order == null ? '' : data.receiver_date_order,
              data.receiver_unit_order == null ? '' : data.receiver_unit_order,
              data.sender_unit_order == null ? '' : data.sender_unit_order,
            )
          }
          else if (data.sender_date && data.receiver_date) {
            this.paginate()
            this.getByReceiverSenderDate(
              data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
              data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
              data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
              data.sender_unit == null ? '%%' : "%" + data.sender_unit + "%",
              data.receiver_personal_number == null ? '%%' : '%%' + data.receiver_personal_number + "%",
              data.receiver_personal_name == null ? '%%' : '%%' + data.receiver_personal_name + "%",
              data.receiver_unit == null ? '%%' : '%%' + data.receiver_unit + "%",
              data.description == null ? '%%' : "%" + data.description + "%",
              data.status == null ? '%%' : "%" + data.status + "%",
              data.limit == null ? this.limit : data.limit,
              this.per_page,
              data.receiver_date,
              data.sender_date,
              data.shipping_no_order == null ? '' : data.shipping_no_order,
              data.sender_personal_number_order == null ? '' : data.sender_personal_number_order,
              data.sender_personal_name_order == null ? '' : data.sender_personal_name_order,
              data.sender_date_order == null ? '' : data.sender_date_order,
              data.receiver_personal_number_order == null ? '' : data.receiver_personal_number_order,
              data.receiver_personal_name_order == null ? '' : data.receiver_personal_name_order,
              data.receiver_date_order == null ? '' : data.receiver_date_order,
              data.receiver_unit_order == null ? '' : data.receiver_unit_order,
              data.sender_unit_order == null ? '' : data.sender_unit_order,
            )
          }
          else if (data.sender_date || data.receiver_date) {
            if (data.sender_date) {
              this.paginate()
              this.getBySenderDate(
                data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
                data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
                data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
                data.sender_unit == null ? '%%' : "%" + data.sender_unit + "%",
                data.receiver_personal_number == null ? '%%' : '%%' + data.receiver_personal_number + "%",
                data.receiver_personal_name == null ? '%%' : '%%' + data.receiver_personal_name + "%",
                data.receiver_unit == null ? '%%' : '%%' + data.receiver_unit + "%",
                data.description == null ? '%%' : "%" + data.description + "%",
                data.status == null ? '%%' : "%" + data.status + "%",
                data.limit == null ? this.limit : data.limit,
                this.per_page,
                data.sender_date,
                data.shipping_no_order == null ? '' : data.shipping_no_order,
                data.sender_personal_number_order == null ? '' : data.sender_personal_number_order,
                data.sender_personal_name_order == null ? '' : data.sender_personal_name_order,
                data.sender_date_order == null ? '' : data.sender_date_order,
                data.receiver_personal_number_order == null ? '' : data.receiver_personal_number_order,
                data.receiver_personal_name_order == null ? '' : data.receiver_personal_name_order,
                data.receiver_date_order == null ? '' : data.receiver_date_order,
                data.receiver_unit_order == null ? '' : data.receiver_unit_order,
                data.sender_unit_order == null ? '' : data.sender_unit_order,
              )
            }
            if (data.receiver_date) {
              this.paginate()
              this.getByReceiverDate(
                data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
                data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
                data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
                data.sender_unit == null ? '%%' : "%" + data.sender_unit + "%",
                data.receiver_personal_number == null ? '%%' : '%%' + data.receiver_personal_number + "%",
                data.receiver_personal_name == null ? '%%' : '%%' + data.receiver_personal_name + "%",
                data.receiver_unit == null ? '%%' : '%%' + data.receiver_unit + "%",
                data.description == null ? '%%' : '%%' + data.description + "%",
                data.status == null ? '%%' : "%" + data.status + "%",
                data.limit == null ? this.limit : data.limit,
                this.per_page,
                data.receiver_date,
                data.shipping_no_order == null ? '' : data.shipping_no_order,
                data.sender_personal_number_order == null ? '' : data.sender_personal_number_order,
                data.sender_personal_name_order == null ? '' : data.sender_personal_name_order,
                data.sender_date_order == null ? '' : data.sender_date_order,
                data.receiver_personal_number_order == null ? '' : data.receiver_personal_number_order,
                data.receiver_personal_name_order == null ? '' : data.receiver_personal_name_order,
                data.receiver_date_order == null ? '' : data.receiver_date_order,
                data.receiver_unit_order == null ? '' : data.receiver_unit_order,
                data.sender_unit_order == null ? '' : data.sender_unit_order,
              )
            }
          }
          else {
            this.paginate()
            this.filterSearch(
              data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
              data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
              data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
              data.sender_unit == null ? '%%' : "%" + data.sender_unit + "%",
              data.receiver_personal_number == null ? '%%' : '%%' + data.receiver_personal_number + "%",
              data.receiver_personal_name == null ? '%%' : '%%' + data.receiver_personal_name + "%",
              data.receiver_unit == null ? '%%' : '%%' + data.receiver_unit + "%",
              data.description == null ? '%%' : "%" + data.description + "%",
              data.status == null ? '%%' : "%" + data.status + "%",
              data.limit == null ? this.limit : data.limit,
              this.per_page,
              data.shipping_no_order == null ? 'desc' : data.shipping_no_order,
              data.sender_personal_number_order == null ? '' : data.sender_personal_number_order,
              data.sender_personal_name_order == null ? '' : data.sender_personal_name_order,
              data.sender_date_order == null ? '' : data.sender_date_order,
              data.receiver_personal_number_order == null ? '' : data.receiver_personal_number_order,
              data.receiver_personal_name_order == null ? '' : data.receiver_personal_name_order,
              data.receiver_date_order == null ? '' : data.receiver_date_order,
              data.receiver_unit_order == null ? '' : data.receiver_unit_order,
              data.sender_unit_order == null ? '' : data.sender_unit_order,
            )
          }
        }
      )
  }

  toggle(): void {
    this.Show = !this.Show;
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

  public paginate(): void {
    if (this.mform.get('page')?.dirty || this.mform.get('limit')?.dirty) {
      this.per_page = (this.mform.get('page')?.value - 1) * this.mform.get('limit')?.value
    } else {
      this.per_page = (this.mform.get('page')?.value - 1) * this.mform.get('limit')?.value
    }
  }

  public noPage(no: number) {
    this.mform.get('page')?.setValue(no)
  }

  public filterSearch(
    shipping_no: string,
    sender_personal_number: string,
    sender_personal_name: string,
    sender_unit: string,
    receiver_personal_number: string,
    receiver_personal_name: string,
    receiver_unit: string,
    description: String,
    status: String,
    limit: Number,
    page: Number,
    shipping_no_order: any,
    sender_personal_number_order: any,
    sender_personal_name_order: any,
    sender_date_order: any,
    receiver_personal_number_order: any,
    receiver_personal_name_order: any,
    receiver_date_order: any,
    receiver_unit_order: any,
    sender_unit_order: any,
  ): void {
    this.documentlistService.getFilterSearch(
      shipping_no,
      sender_personal_number,
      sender_personal_name,
      sender_unit,
      receiver_personal_number,
      receiver_personal_name,
      receiver_unit,
      description,
      status,
      limit,
      page,
      shipping_no_order,
      sender_personal_number_order,
      sender_personal_name_order,
      sender_date_order,
      receiver_personal_number_order,
      receiver_personal_name_order,
      receiver_date_order,
      receiver_unit_order,
      sender_unit_order,
    ).subscribe(
      (response) => {
        this.length = response.spdoc_data_aggregate.aggregate.count
        this.data = response.spdoc_data
        console.log(this.data)
        this.getCountData()
      }
    )
  }

  public getBySenderDate(
    shipping_no: any,
    sender_personal_number: any,
    sender_personal_name: any,
    sender_unit: any,
    receiver_personal_number: any,
    receiver_personal_name: any,
    receiver_unit: any,
    description: any,
    status: String,
    limit: Number,
    page: Number,
    sender_date: any,
    shipping_no_order: any,
    sender_personal_number_order: any,
    sender_personal_name_order: any,
    sender_date_order: any,
    receiver_personal_number_order: any,
    receiver_personal_name_order: any,
    receiver_date_order: any,
    receiver_unit_order: any,
    sender_unit_order: any,
  ): void {
    this.documentlistService.getFilterSenderDate(
      shipping_no,
      sender_personal_number,
      sender_personal_name,
      sender_unit,
      receiver_personal_number,
      receiver_personal_name,
      receiver_unit,
      description,
      status,
      limit,
      page,
      sender_date,
      shipping_no_order,
      sender_personal_number_order,
      sender_personal_name_order,
      sender_date_order,
      receiver_personal_number_order,
      receiver_personal_name_order,
      receiver_date_order,
      receiver_unit_order,
      sender_unit_order,
    ).subscribe(
      (response) => {
        this.length = response.spdoc_data_aggregate.aggregate.count
        this.data = response.spdoc_data
        this.getCountData()
      }
    )
  }

  public getByReceiverDate(
    shipping_no: string,
    sender_personal_number: string,
    sender_personal_name: string,
    sender_unit: string,
    receiver_personal_number: string,
    receiver_personal_name: string,
    receiver_unit: string,
    description: string,
    status: String,
    limit: Number,
    page: Number,
    receiver_date: any,
    shipping_no_order: any,
    sender_personal_number_order: any,
    sender_personal_name_order: any,
    sender_date_order: any,
    receiver_personal_number_order: any,
    receiver_personal_name_order: any,
    receiver_date_order: any,
    receiver_unit_order: any,
    sender_unit_order: any,
  ): void {
    this.documentlistService.getFilterReceiverDate(
      shipping_no,
      sender_personal_number,
      sender_personal_name,
      sender_unit,
      receiver_personal_number,
      receiver_personal_name,
      receiver_unit,
      description,
      status,
      limit,
      page,
      receiver_date,
      shipping_no_order,
      sender_personal_number_order,
      sender_personal_name_order,
      sender_date_order,
      receiver_personal_number_order,
      receiver_personal_name_order,
      receiver_date_order,
      receiver_unit_order,
      sender_unit_order,
    ).subscribe(
      (response) => {
        this.length = response.spdoc_data_aggregate.aggregate.count
        this.data = response.spdoc_data
        this.getCountData()
      }
    )
  }

  public getByReceiverSenderDate(
    shipping_no: string,
    sender_personal_number: string,
    sender_personal_name: string,
    sender_unit: string,
    receiver_personal_number: string,
    receiver_personal_name: string,
    receiver_unit: string,
    description: String,
    status: String,
    limit: Number,
    page: Number,
    receiver_date: any,
    sender_date: any,
    shipping_no_order: any,
    sender_personal_number_order: any,
    sender_personal_name_order: any,
    sender_date_order: any,
    receiver_personal_number_order: any,
    receiver_personal_name_order: any,
    receiver_date_order: any,
    receiver_unit_order: any,
    sender_unit_order: any,
  ): void {
    this.documentlistService.getFilterReceiverSenderDate(
      shipping_no,
      sender_personal_number,
      sender_personal_name,
      sender_unit,
      receiver_personal_number,
      receiver_personal_name,
      receiver_unit,
      description,
      status,
      limit,
      page,
      receiver_date,
      sender_date,
      shipping_no_order,
      sender_personal_number_order,
      sender_personal_name_order,
      sender_date_order,
      receiver_personal_number_order,
      receiver_personal_name_order,
      receiver_date_order,
      receiver_unit_order,
      sender_unit_order,
    ).subscribe(
      (response) => {
        this.length = response.spdoc_data_aggregate.aggregate.count
        this.data = response.spdoc_data
        this.getCountData()
      }
    )
  }

  public showDocument(id_sp_data: number): void {
    this.router.navigate(['/view-spdocument/' + id_sp_data]);
  }

  public editDocument(id_sp_data: number): void {
    this.router.navigate(['/edit-spdocument/' + id_sp_data]);
  }

  public nextPage(): void {
    this.mform.get('page')?.setValue(this.mform.get('page')?.value + 1)
  }

  public prevPage(): void {
    this.mform.get('page')?.setValue(this.mform.get('page')?.value - 1)
  }

  public showDocumentPDF(id_sp_data: number): void {
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

      pdf.setFontSize(12);
      pdf.addImage(imageData, 'PNG', 0, 0, pdfw, pdfh)

      pdf.save('SP-' + id_sp_data + '.pdf');
    });
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
    if (this.mform.get('sender_date')?.value == null && this.mform.get('receiver_date')?.value == null) {
      this.paginate()
      this.filterSearch(
        this.mform.get('shipping_no')?.value == null ? '%%' : "%" + this.mform.get('shipping_no')?.value + "%",
        this.mform.get('sender_personal_number')?.value == null ? '%%' : "%" + this.mform.get('sender_personal_number')?.value + "%",
        this.mform.get('sender_personal_name')?.value == null ? '%%' : "%" + this.mform.get('sender_personal_name')?.value + "%",
        this.mform.get('sender_unit')?.value == null ? '%%' : "%" + this.mform.get('sender_unit')?.value + "%",
        this.mform.get('receiver_personal_number')?.value == null ? '%%' : '%%' + this.mform.get('receiver_personal_number')?.value + "%",
        this.mform.get('receiver_personal_name')?.value == null ? '%%' : '%%' + this.mform.get('receiver_personal_name')?.value + "%",
        this.mform.get('receiver_unit')?.value == null ? '%%' : '%%' + this.mform.get('receiver_unit')?.value + "%",
        this.mform.get('description')?.value == null ? '%%' : "%" + this.mform.get('description')?.value + "%",
        this.mform.get('status')?.value == null ? '%%' : "%" + this.mform.get('status')?.value + "%",
        this.mform.get('limit')?.value == null ? this.limit : this.mform.get('limit')?.value,
        this.per_page,
        this.mform.get('shipping_no_order')?.value == null ? '' : this.mform.get('shipping_no_order')?.value,
        this.mform.get('sender_personal_number_order')?.value == null ? '' : this.mform.get('sender_personal_number_order')?.value,
        this.mform.get('sender_personal_name_order')?.value == null ? '' : this.mform.get('sender_personal_name_order')?.value,
        this.mform.get('sender_date_order')?.value == null ? '' : this.mform.get('sender_date_order')?.value,
        this.mform.get('receiver_personal_number_order')?.value == null ? '' : this.mform.get('receiver_personal_number_order')?.value,
        this.mform.get('receiver_personal_name_order')?.value == null ? '' : this.mform.get('receiver_personal_name_order')?.value,
        this.mform.get('receiver_date_order')?.value == null ? '' : this.mform.get('receiver_date_order')?.value,
        this.mform.get('receiver_unit_order')?.value == null ? '' : this.mform.get('receiver_unit_order')?.value,
        this.mform.get('sender_unit_order')?.value == null ? '' : this.mform.get('sender_unit_order')?.value,
      )
    }
    else if (this.mform.get('sender_date')?.value && this.mform.get('receiver_date')?.value) {
      this.paginate()
      this.getByReceiverSenderDate(
        this.mform.get('shipping_no')?.value == null ? '%%' : "%" + this.mform.get('shipping_no')?.value + "%",
        this.mform.get('sender_personal_number')?.value == null ? '%%' : "%" + this.mform.get('sender_personal_number')?.value + "%",
        this.mform.get('sender_personal_name')?.value == null ? '%%' : "%" + this.mform.get('sender_personal_name')?.value + "%",
        this.mform.get('sender_unit')?.value == null ? '%%' : "%" + this.mform.get('sender_unit')?.value + "%",
        this.mform.get('receiver_personal_number')?.value == null ? '%%' : '%%' + this.mform.get('receiver_personal_number')?.value + "%",
        this.mform.get('receiver_personal_name')?.value == null ? '%%' : '%%' + this.mform.get('receiver_personal_name')?.value + "%",
        this.mform.get('receiver_unit')?.value == null ? '%%' : '%%' + this.mform.get('receiver_unit')?.value + "%",
        this.mform.get('status')?.value == null ? '%%' : "%" + this.mform.get('status')?.value + "%",
        this.mform.get('description')?.value == null ? '%%' : "%" + this.mform.get('status')?.value + "%",
        this.mform.get('limit')?.value == null ? this.limit : this.mform.get('limit')?.value,
        this.per_page,
        this.mform.get('receiver_date')?.value,
        this.mform.get('sender_date')?.value,
        this.mform.get('shipping_no_order')?.value == null ? '' : this.mform.get('shipping_no_order')?.value,
        this.mform.get('sender_personal_number_order')?.value == null ? '' : this.mform.get('sender_personal_number_order')?.value,
        this.mform.get('sender_personal_name_order')?.value == null ? '' : this.mform.get('sender_personal_name_order')?.value,
        this.mform.get('sender_date_order')?.value == null ? '' : this.mform.get('sender_date_order')?.value,
        this.mform.get('receiver_personal_number_order')?.value == null ? '' : this.mform.get('receiver_personal_number_order')?.value,
        this.mform.get('receiver_personal_name_order')?.value == null ? '' : this.mform.get('receiver_personal_name_order')?.value,
        this.mform.get('receiver_date_order')?.value == null ? '' : this.mform.get('receiver_date_order')?.value,
        this.mform.get('receiver_unit_order')?.value == null ? '' : this.mform.get('receiver_unit_order')?.value,
        this.mform.get('sender_unit_order')?.value == null ? '' : this.mform.get('sender_unit_order')?.value,
      )
    }
    else if (this.mform.get('sender_date')?.value || this.mform.get('receiver_date')?.value) {
      if (this.mform.get('sender_date')?.value) {
        this.paginate()
        this.getBySenderDate(
          this.mform.get('shipping_no')?.value == null ? '%%' : "%" + this.mform.get('shipping_no')?.value + "%",
          this.mform.get('sender_personal_number')?.value == null ? '%%' : "%" + this.mform.get('sender_personal_number')?.value + "%",
          this.mform.get('sender_personal_name')?.value == null ? '%%' : "%" + this.mform.get('sender_personal_name')?.value + "%",
          this.mform.get('sender_unit')?.value == null ? '%%' : "%" + this.mform.get('sender_unit')?.value + "%",
          this.mform.get('receiver_personal_number')?.value == null ? '%%' : '%%' + this.mform.get('receiver_personal_number')?.value + "%",
          this.mform.get('receiver_personal_name')?.value == null ? '%%' : '%%' + this.mform.get('receiver_personal_name')?.value + "%",
          this.mform.get('receiver_unit')?.value == null ? '%%' : '%%' + this.mform.get('receiver_unit')?.value + "%",
          this.mform.get('description')?.value == null ? '%%' : '%%' + this.mform.get('description')?.value + "%",
          this.mform.get('status')?.value == null ? '%%' : "%" + this.mform.get('status')?.value + "%",
          this.mform.get('limit')?.value == null ? this.limit : this.mform.get('limit')?.value,
          this.per_page,
          this.mform.get('sender_date')?.value,
          this.mform.get('shipping_no_order')?.value == null ? '' : this.mform.get('shipping_no_order')?.value,
          this.mform.get('sender_personal_number_order')?.value == null ? '' : this.mform.get('sender_personal_number_order')?.value,
          this.mform.get('sender_personal_name_order')?.value == null ? '' : this.mform.get('sender_personal_name_order')?.value,
          this.mform.get('sender_date_order')?.value == null ? '' : this.mform.get('sender_date_order')?.value,
          this.mform.get('receiver_personal_number_order')?.value == null ? '' : this.mform.get('receiver_personal_number_order')?.value,
          this.mform.get('receiver_personal_name_order')?.value == null ? '' : this.mform.get('receiver_personal_name_order')?.value,
          this.mform.get('receiver_date_order')?.value == null ? '' : this.mform.get('receiver_date_order')?.value,
          this.mform.get('receiver_unit_order')?.value == null ? '' : this.mform.get('receiver_unit_order')?.value,
          this.mform.get('sender_unit_order')?.value == null ? '' : this.mform.get('sender_unit_order')?.value,
        )
      }
      if (this.mform.get('receiver_date')?.value) {
        this.paginate()
        this.getByReceiverDate(
          this.mform.get('shipping_no')?.value == null ? '%%' : "%" + this.mform.get('shipping_no')?.value + "%",
          this.mform.get('sender_personal_number')?.value == null ? '%%' : "%" + this.mform.get('sender_personal_number')?.value + "%",
          this.mform.get('sender_personal_name')?.value == null ? '%%' : "%" + this.mform.get('sender_personal_name')?.value + "%",
          this.mform.get('sender_unit')?.value == null ? '%%' : "%" + this.mform.get('sender_unit')?.value + "%",
          this.mform.get('receiver_personal_number')?.value == null ? '%%' : '%%' + this.mform.get('receiver_personal_number')?.value + "%",
          this.mform.get('receiver_personal_name')?.value == null ? '%%' : '%%' + this.mform.get('receiver_personal_name')?.value + "%",
          this.mform.get('receiver_unit')?.value == null ? '%%' : '%%' + this.mform.get('receiver_unit')?.value + "%",
          this.mform.get('description')?.value == null ? '%%' : '%%' + this.mform.get('description')?.value + "%",
          this.mform.get('status')?.value == null ? '%%' : "%" + this.mform.get('status')?.value + "%",
          this.mform.get('limit')?.value == null ? this.limit : this.mform.get('limit')?.value,
          this.per_page,
          this.mform.get('receiver_date')?.value,
          this.mform.get('shipping_no_order')?.value == null ? '' : this.mform.get('shipping_no_order')?.value,
          this.mform.get('sender_personal_number_order')?.value == null ? '' : this.mform.get('sender_personal_number_order')?.value,
          this.mform.get('sender_personal_name_order')?.value == null ? '' : this.mform.get('sender_personal_name_order')?.value,
          this.mform.get('sender_date_order')?.value == null ? '' : this.mform.get('sender_date_order')?.value,
          this.mform.get('receiver_personal_number_order')?.value == null ? '' : this.mform.get('receiver_personal_number_order')?.value,
          this.mform.get('receiver_personal_name_order')?.value == null ? '' : this.mform.get('receiver_personal_name_order')?.value,
          this.mform.get('receiver_date_order')?.value == null ? '' : this.mform.get('receiver_date_order')?.value,
          this.mform.get('receiver_unit_order')?.value == null ? '' : this.mform.get('receiver_unit_order')?.value,
          this.mform.get('sender_unit_order')?.value == null ? '' : this.mform.get('sender_unit_order')?.value,
        )
      }
    }
    else {
      this.paginate()
      this.filterSearch(
        this.mform.get('shipping_no')?.value == null ? '%%' : "%" + this.mform.get('shipping_no')?.value + "%",
        this.mform.get('sender_personal_number')?.value == null ? '%%' : "%" + this.mform.get('sender_personal_number')?.value + "%",
        this.mform.get('sender_personal_name')?.value == null ? '%%' : "%" + this.mform.get('sender_personal_name')?.value + "%",
        this.mform.get('sender_unit')?.value == null ? '%%' : "%" + this.mform.get('sender_unit')?.value + "%",
        this.mform.get('receiver_personal_number')?.value == null ? '%%' : '%%' + this.mform.get('receiver_personal_number')?.value + "%",
        this.mform.get('receiver_personal_name')?.value == null ? '%%' : '%%' + this.mform.get('receiver_personal_name')?.value + "%",
        this.mform.get('receiver_unit')?.value == null ? '%%' : '%%' + this.mform.get('receiver_unit')?.value + "%",
        this.mform.get('description')?.value == null ? '%%' : "%" + this.mform.get('description')?.value + "%",
        this.mform.get('status')?.value == null ? '%%' : "%" + this.mform.get('status')?.value + "%",
        this.mform.get('limit')?.value == null ? this.limit : this.mform.get('limit')?.value,
        this.per_page,
        this.mform.get('shipping_no_order')?.value == null ? '' : this.mform.get('shipping_no_order')?.value,
        this.mform.get('sender_personal_number_order')?.value == null ? '' : this.mform.get('sender_personal_number_order')?.value,
        this.mform.get('sender_personal_name_order')?.value == null ? '' : this.mform.get('sender_personal_name_order')?.value,
        this.mform.get('sender_date_order')?.value == null ? '' : this.mform.get('sender_date_order')?.value,
        this.mform.get('receiver_personal_number_order')?.value == null ? '' : this.mform.get('receiver_personal_number_order')?.value,
        this.mform.get('receiver_personal_name_order')?.value == null ? '' : this.mform.get('receiver_personal_name_order')?.value,
        this.mform.get('receiver_date_order')?.value == null ? '' : this.mform.get('receiver_date_order')?.value,
        this.mform.get('receiver_unit_order')?.value == null ? '' : this.mform.get('receiver_unit_order')?.value,
        this.mform.get('sender_unit_order')?.value == null ? '' : this.mform.get('sender_unit_order')?.value,
      )
    }
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

  public sortASCDESC(
    shipping_no_order: String,
    sender_personal_number_order: String,
    sender_personal_name_order: String,
    sender_date_order: String,
    receiver_personal_number_order: String,
    receiver_personal_name_order: String,
    receiver_date_order: String,
    receiver_unit_order: String,
    sender_unit_order: String,
    ) {
    this.mform.get('shipping_no_order')?.setValue(shipping_no_order)
    this.mform.get('sender_personal_number_order')?.setValue(sender_personal_number_order)
    this.mform.get('sender_personal_name_order')?.setValue(sender_personal_name_order)
    this.mform.get('sender_date_order')?.setValue(sender_date_order)
    this.mform.get('receiver_personal_number_order')?.setValue(receiver_personal_number_order)
    this.mform.get('receiver_personal_name_order')?.setValue(receiver_personal_name_order)
    this.mform.get('receiver_date_order')?.setValue(receiver_date_order)
    this.mform.get('receiver_unit_order')?.setValue(receiver_unit_order)
    this.mform.get('sender_unit_order')?.setValue(sender_unit_order)
  }

  ngOnDestroy() {
    this.obs.unsubscribe()
  }

}
