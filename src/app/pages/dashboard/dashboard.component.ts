import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSliders, faBookOpen, faListSquares, faHourglassStart, faCheck, faUser, faArrowRightArrowLeft, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from 'src/app/core/services/rest.service';
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


  data!: any;
  countAll!: Number;
  countOpen!: Number;
  countDelivered!: Number;

  dataShow: any;

  id_sp_doc!: Number;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDataCard('%%');
    this.getCountOpen();
    this.getCountDelivered();
  }

  public getDataCard(status: String) {
    this.dashboardService.getDashboard(status == null ? '%%' : status)
      .subscribe(
        (response) => {
          this.data = response.spdoc_data
          this.countAll = response.spdoc_data_aggregate.aggregate.count
        }
      )
  }

  public getCountOpen(cat_status: String = "Open") {
    this.dashboardService.getCountCard(cat_status)
      .subscribe(
        (response) => {
          this.countOpen = response.spdoc_data_aggregate.aggregate.count
        }
      )
  }

  public getCountDelivered(cat_status: String = "Delivered") {
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


}
