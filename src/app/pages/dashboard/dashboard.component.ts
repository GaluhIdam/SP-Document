import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSliders, faBookOpen, faListSquares, faHourglassStart, faCheck, faUser, faArrowRightArrowLeft, faCalendar, faCaretRight, faCaretLeft, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { debounce, debounceTime, Subscription } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
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

  //Order By
  created_at: String = 'desc';
  status_order: String = 'desc';
  shipping_no_order: String = 'desc';
  sender_date_order: String = 'desc';
  receiver_date_order: String = 'desc';
  status: String = "%%"

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
  limit: number = 9;
  per_page!: number;
  long_page!: number;
  isActive: any;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
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
  });

  ngOnInit() {
    this.getCountAllTotal();
    this.getCountOpenTotal();
    this.getCountDeliveredTotal();
    this.obs = this.mform.valueChanges
      .pipe(debounceTime(500)).subscribe(
        () => {
          this.paginate()
          this.getDataDocument(
            this.mform.get('limit')?.value,
            this.per_page,
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
          )
        }
      )
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
  }

  public getByDate() {
    this.mform.get('created_at')?.setValue('desc')
    this.mform.get('status_order')?.setValue('')
    this.mform.get('shipping_no_order')?.setValue('')
    this.mform.get('sender_date_order')?.setValue('')
    this.mform.get('receiver_date_order')?.setValue('')
  }
  public getByStatus() {
    this.mform.get('created_at')?.setValue('')
    this.mform.get('status_order')?.setValue('desc')
    this.mform.get('shipping_no_order')?.setValue('')
    this.mform.get('sender_date_order')?.setValue('')
    this.mform.get('receiver_date_order')?.setValue('')
  }

  public getByShippingNo() {
    this.mform.get('created_at')?.setValue('')
    this.mform.get('status_order')?.setValue('')
    this.mform.get('shipping_no_order')?.setValue('asc')
    this.mform.get('sender_date_order')?.setValue('')
    this.mform.get('receiver_date_order')?.setValue('')
  }

  public getBySending() {
    this.mform.get('created_at')?.setValue('')
    this.mform.get('status_order')?.setValue('')
    this.mform.get('shipping_no_order')?.setValue('')
    this.mform.get('sender_date_order')?.setValue('desc')
    this.mform.get('receiver_date_order')?.setValue('')
  }

  public getByReceiving() {
    this.mform.get('created_at')?.setValue('')
    this.mform.get('status_order')?.setValue('')
    this.mform.get('shipping_no_order')?.setValue('')
    this.mform.get('sender_date_order')?.setValue('')
    this.mform.get('receiver_date_order')?.setValue('desc')
  }

  //TOTAL
  public getCountAllTotal(cat_status: String = "%%") {
    this.dashboardService.getCountCard(cat_status)
      .subscribe(
        (response) => {
          this.countAll = response.spdoc_data_aggregate.aggregate.count
        }
      )
  }
  public getCountOpenTotal(cat_status: String = "Open") {
    this.dashboardService.getCountCard(cat_status)
      .subscribe(
        (response) => {
          this.countOpen = response.spdoc_data_aggregate.aggregate.count
        }
      )
  }
  public getCountDeliveredTotal(cat_status: String = "Delivered") {
    this.dashboardService.getCountCard(cat_status)
      .subscribe(
        (response) => {
          this.countDelivered = response.spdoc_data_aggregate.aggregate.count
        }
      )
  }

  public showDocument(id_sp_data: number) {
    this.router.navigate(['/view-spdocument/' + id_sp_data]);
  }

  public paginate() {
    if (this.mform.get('page')?.dirty || this.mform.get('limit')?.dirty) {
      this.per_page = (this.mform.get('page')?.value - 1) * this.mform.get('limit')?.value
    } else {
      this.per_page = (this.mform.get('page')?.value - 1) * this.mform.get('limit')?.value
    }
  }

  public getCountData() {
    this.long_page = this.length / this.mform.get('limit')?.value
    this.long_page = Math.ceil(this.long_page)
    this.pagination = []
    for (let i = 0; i < this.long_page; i++) {
      this.pagination.push({
        no: i + 1
      })
    }
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
    status: any,
    created_at: any,
    status_order: any,
    shipping_no_order: any,
    sender_date_order: any,
    receiver_date_order: any,
  ) {
    this.dashboardService.getDataDocument(
      limit,
      offset,
      sender_personal_name,
      sender_personal_number,
      shipping_no,
      receiver_personal_name,
      receiver_personal_number,
      status,
      created_at,
      status_order,
      shipping_no_order,
      sender_date_order,
      receiver_date_order
    )
      .subscribe(
        (response) => {
          this.data = response.spdoc_data
          this.length = response.spdoc_data_aggregate.aggregate.count
          this.getCountData()
        }
      )
  }
}
