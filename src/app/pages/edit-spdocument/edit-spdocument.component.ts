import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faChevronDown, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-spdocument',
  templateUrl: './edit-spdocument.component.html',
  styleUrls: ['./edit-spdocument.component.css']
})
export class EditSpdocumentComponent {
  faArrowLeft = faArrowLeft;
  faChevronDown = faChevronDown;
  faPenSquare = faPenSquare;
  faTrash = faTrash;
  dataShow: any;


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.dataShow = this.route.snapshot.data['state'];
    console.log(this.route.snapshot.data['state'])
  }
  
  
  
}
