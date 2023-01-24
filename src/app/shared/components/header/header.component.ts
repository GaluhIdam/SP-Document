import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faAngleRight, faBell, faChevronDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  template: `{{data}}`
})
export class HeaderComponent {
  faAngleRight = faAngleRight;
  faBell = faBell;
  faChevronDown = faChevronDown;
  faRightFromBracket = faRightFromBracket;
}
