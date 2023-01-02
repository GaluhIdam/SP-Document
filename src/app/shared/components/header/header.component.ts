import { Component } from '@angular/core';
import { faAngleRight, faBell, faChevronDown, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faAngleRight = faAngleRight;
  faBell = faBell;
  faChevronDown = faChevronDown;
  faLongArrowAltLeft = faLongArrowAltLeft;

  Show: boolean = false
  toggle() {
    this.Show = !this.Show;
  }
}
