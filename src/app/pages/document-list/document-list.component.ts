import { Component } from '@angular/core';
import { faBookOpen, faEye, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  faEye = faEye;
  faBookOpen = faBookOpen;
  faEllipsisVertical = faEllipsisVertical;
  Show: boolean = false
  toggle() {
    this.Show = !this.Show;
  }
}
