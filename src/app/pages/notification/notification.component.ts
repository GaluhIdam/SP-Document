import { Component } from '@angular/core';
import { faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  faArrowLeft = faArrowLeft;
  faEye = faEye;
}
