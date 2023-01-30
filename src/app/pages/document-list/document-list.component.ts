import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faBookOpen, faEye, faEllipsisVertical, faPencilSquare, faFileInvoice, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';

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

  Show: boolean = false

  data!: any;

  obs!: Subscription;

  limit: Number = 10;
  page: Number = 0;

  mform: FormGroup = new FormGroup({
    shipping_no: new FormControl(),

    sender_personal_number: new FormControl(),
    sender_personal_name: new FormControl(),
    sender_date: new FormControl(),

    receiver_personal_number: new FormControl(),
    receiver_personal_name: new FormControl(),
    receiver_date: new FormControl(),

    status: new FormControl(),

    limitx: new FormControl(),
  });

  constructor(private dashboardService: DashboardService) { }


  ngOnInit() {
    this.getDataCard('%%')
    this.obs = this.mform.valueChanges
      .pipe(debounceTime(500)).subscribe(
        (data) => {
          if (data.sender_date == null && data.receiver_date == null) {
            this.filterSearch(
              data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
              data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
              data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
              data.receiver_personal_number == null ? '%%' : data.receiver_personal_number + "%",
              data.receiver_personal_name == null ? '%%' : data.receiver_personal_name + "%",
              data.status == null ? '%%' : "%" + data.status + "%",
              data.limitx == null ? this.limit : data.limitx,
              this.page
            )
          } else if (data.sender_date || data.receiver_date) {
            if (data.sender_date) {
              this.getBySenderDate(
                data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
                data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
                data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
                data.receiver_personal_number == null ? '%%' : data.receiver_personal_number + "%",
                data.receiver_personal_name == null ? '%%' : data.receiver_personal_name + "%",
                data.status == null ? '%%' : "%" + data.status + "%",
                data.limitx == null ? this.limit : data.limitx,
                this.page,
                data.sender_date
                )
              } 
              if (data.receiver_date) {
                this.getByReceiverDate(
                data.shipping_no == null ? '%%' : "%" + data.shipping_no + "%",
                data.sender_personal_number == null ? '%%' : "%" + data.sender_personal_number + "%",
                data.sender_personal_name == null ? '%%' : "%" + data.sender_personal_name + "%",
                data.receiver_personal_number == null ? '%%' : data.receiver_personal_number + "%",
                data.receiver_personal_name == null ? '%%' : data.receiver_personal_name + "%",
                data.status == null ? '%%' : "%" + data.status + "%",
                data.limitx == null ? this.limit : data.limitx,
                this.page,
                data.receiver_date
                )
                console.log(data)
            }
          }
        }
      )
  }

  toggle() {
    this.Show = !this.Show;
  }

  public getDataCard(status: String) {
    this.dashboardService.getDashboard(status == null ? '%%' : status)
      .subscribe(
        (response) => {
          this.data = response.spdoc_data
        }
      )
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
    this.dashboardService.getFilterSearch(
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
          this.data = response.spdoc_data
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
    this.dashboardService.getFilterSenderDate(
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
        this.data = response.spdoc_data
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
    this.dashboardService.getFilterReceiverDate(
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
        this.data = response.spdoc_data
      }
    )
  }

  ngOnDestroy() {
    this.obs.unsubscribe()
  }

}
