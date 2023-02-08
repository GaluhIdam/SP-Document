import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faBookOpen, faEye, faEllipsisVertical, faPencilSquare, faFileInvoice, faCircleCheck, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, Subscription } from 'rxjs';
import { DocumentListService } from './document-list.service';

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

  Show: boolean = false

  data!: any;

  obs!: Subscription;

  length!: number;
  limit: number = 10;
  page: number = 1;
  per_page!: number;
  long_page!: number;

  pagination: {
    no: number;
  }[] = [];

  mform: FormGroup = new FormGroup({
    shipping_no: new FormControl(),

    sender_personal_number: new FormControl(),
    sender_personal_name: new FormControl(),
    sender_date: new FormControl(),

    receiver_personal_number: new FormControl(),
    receiver_personal_name: new FormControl(),
    receiver_date: new FormControl(),

    status: new FormControl(),

    limit: new FormControl(this.limit),
    page: new FormControl(this.page),
  });

  constructor(
    private documentlistService: DocumentListService,
    private router: Router
  ) { }


  ngOnInit() {
    this.obs = this.mform.valueChanges
      .pipe(debounceTime(500)).subscribe(
        (data) => {
          if (data.sender_date == null && data.receiver_date == null) {
            this.paginate()
            this.filterSearch(
              data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
              data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
              data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
              data.receiver_personal_number == null ? '%%' : '%%' + data.receiver_personal_number + "%",
              data.receiver_personal_name == null ? '%%' : '%%' + data.receiver_personal_name + "%",
              data.status == null ? '%%' : "%" + data.status + "%",
              data.limit == null ? this.limit : data.limit,
              this.per_page
            )
          }
          else if (data.sender_date && data.receiver_date) {
            this.paginate()
            this.getByReceiverSenderDate(
              data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
              data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
              data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
              data.receiver_personal_number == null ? '%%' : '%%' + data.receiver_personal_number + "%",
              data.receiver_personal_name == null ? '%%' : '%%' + data.receiver_personal_name + "%",
              data.status == null ? '%%' : "%" + data.status + "%",
              data.limit == null ? this.limit : data.limit,
              this.per_page,
              data.receiver_date,
              data.sender_date,
            )
          }
          else if (data.sender_date || data.receiver_date) {
            if (data.sender_date) {
              this.paginate()
              this.getBySenderDate(
                data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
                data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
                data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
                data.receiver_personal_number == null ? '%%' : '%%' + data.receiver_personal_number + "%",
                data.receiver_personal_name == null ? '%%' : '%%' + data.receiver_personal_name + "%",
                data.status == null ? '%%' : "%" + data.status + "%",
                data.limit == null ? this.limit : data.limit,
                this.per_page,
                data.sender_date
              )
            }
            if (data.receiver_date) {
              this.paginate()
              this.getByReceiverDate(
                data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
                data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
                data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
                data.receiver_personal_number == null ? '%%' : '%%' + data.receiver_personal_number + "%",
                data.receiver_personal_name == null ? '%%' : '%%' + data.receiver_personal_name + "%",
                data.status == null ? '%%' : "%" + data.status + "%",
                data.limit == null ? this.limit : data.limit,
                this.per_page,
                data.receiver_date
              )
            }
          }
          else {
            this.paginate()
            this.filterSearch(
              data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
              data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
              data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
              data.receiver_personal_number == null ? '%%' : '%%' + data.receiver_personal_number + "%",
              data.receiver_personal_name == null ? '%%' : '%%' + data.receiver_personal_name + "%",
              data.status == null ? '%%' : "%" + data.status + "%",
              data.limit == null ? this.limit : data.limit,
              this.per_page
            )
          }
        }
      )
  }

  toggle() {
    this.Show = !this.Show;
  }

  public getCountData() {
    this.long_page = this.length / this.mform.get('limit')?.value
    this.long_page = Math.ceil(this.long_page)
    this.pagination = []
    for(let i = 0; i < this.long_page; i++) {
      this.pagination.push({
        no: i + 1
      })
    }
  }
  
  public paginate() {
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
    receiver_personal_number: string,
    receiver_personal_name: string,
    status: String,
    limit: Number,
    page: Number
  ) {
    this.documentlistService.getFilterSearch(
      shipping_no,
      sender_personal_number,
      sender_personal_name,
      receiver_personal_number,
      receiver_personal_name,
      status,
      limit,
      page,

    ).subscribe(
      (response) => {
        this.length = response.spdoc_data_aggregate.aggregate.count
        this.data = response.spdoc_data
        this.getCountData()
      }
    )
  }

  public getBySenderDate(
    shipping_no: string,
    sender_personal_number: string,
    sender_personal_name: string,
    receiver_personal_number: string,
    receiver_personal_name: string,
    status: String,
    limit: Number,
    page: Number,
    sender_date: any
  ) {
    this.documentlistService.getFilterSenderDate(
      shipping_no,
      sender_personal_number,
      sender_personal_name,
      receiver_personal_number,
      receiver_personal_name,
      status,
      limit,
      page,
      sender_date,
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
    receiver_personal_number: string,
    receiver_personal_name: string,
    status: String,
    limit: Number,
    page: Number,
    receiver_date: any
  ) {
    this.documentlistService.getFilterReceiverDate(
      shipping_no,
      sender_personal_number,
      sender_personal_name,
      receiver_personal_number,
      receiver_personal_name,
      status,
      limit,
      page,
      receiver_date,
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
    receiver_personal_number: string,
    receiver_personal_name: string,
    status: String,
    limit: Number,
    page: Number,
    receiver_date: any,
    sender_date: any,
  ) {
    this.documentlistService.getFilterReceiverSenderDate(
      shipping_no,
      sender_personal_number,
      sender_personal_name,
      receiver_personal_number,
      receiver_personal_name,
      status,
      limit,
      page,
      receiver_date,
      sender_date,
    ).subscribe(
      (response) => {
        this.length = response.spdoc_data_aggregate.aggregate.count
        this.data = response.spdoc_data
        this.getCountData()
      }
    )
  }

  public showDocument(id_sp_data: number) {
    this.router.navigate(['/view-spdocument/' + id_sp_data]);
  }

  public editDocument(id_sp_data: number) {
    this.router.navigate(['/edit-spdocument/' + id_sp_data]);
  }

  ngOnDestroy() {
    this.obs.unsubscribe()
  }

}
