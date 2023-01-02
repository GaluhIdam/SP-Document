import { Component } from '@angular/core';
import { faHouse, faTicketSimple } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  faHouse = faHouse;
  faTicketSimple = faTicketSimple;
}
