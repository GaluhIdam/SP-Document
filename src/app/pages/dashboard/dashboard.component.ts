import { Component } from '@angular/core';
import { faSliders, faBookOpen, faListSquares, faHourglassStart, faCheck, faUser, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CardSpDocument } from 'src/app/core/interfaces/card-sp-document.dto';
import { DashboardService } from 'src/app/core/services/dashboard.service';
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

  showDashboard() {
    this.DashboardService.getDashboard().subscribe((data:CardSpDocument) => this.dashboard = {

    })
  }
}
