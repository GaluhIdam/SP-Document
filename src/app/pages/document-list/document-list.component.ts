import { Component } from '@angular/core';
import { faBookOpen, faEye, faEllipsisVertical, faPencilSquare, faFileInvoice, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

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
  toggle() {
    this.Show = !this.Show;
  }
}
