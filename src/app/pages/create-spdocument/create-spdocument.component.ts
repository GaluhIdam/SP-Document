import { Component } from '@angular/core';
import { faArrowLeft, faChevronDown, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-spdocument',
  templateUrl: './create-spdocument.component.html',
  styleUrls: ['./create-spdocument.component.css']
})
export class CreateSpdocumentComponent {
  faArrowLeft = faArrowLeft;
  faChevronDown = faChevronDown;
  faPenSquare = faPenSquare;
  faTrash = faTrash;
}
