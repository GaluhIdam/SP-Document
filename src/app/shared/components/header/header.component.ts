import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faAngleRight, faBell, faChevronDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { KeycloakService } from 'keycloak-angular';
import { filter } from 'rxjs/operators';
import { baseURL } from 'src/app/core/services/baseURL';
import { HeaderService } from './header.service';

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

  url_local: any = 'http://localhost:4200'
  title: any;

  personal_number: any;
  user: any  = {
    personalName: String,
    unit: String,
  };

  photo: any;
  photo_default: any = 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private keycloakService: KeycloakService,
    private headerService: HeaderService,
    ) {
  }

  ngOnInit() {
    this.initializeUserOptions()
    this.getUserData(this.personal_number)
    this.photo = 'https://talentlead.gmf-aeroasia.co.id/images/avatar/'+this.personal_number+'.jpg';
    this.activatedRoute.data.subscribe(data => {
      this.title=data;
    })
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
      .subscribe(() => {

        var rt = this.getChild(this.activatedRoute)

        rt.data.subscribe((data: { title: string; }) => {
          this.title = data.title;
          this.titleService.setTitle(data.title)
        })
      })
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
  
  //GET Personal Number from Keycloak
  private initializeUserOptions(): void {
    this.personal_number = this.keycloakService.getUsername();
  }

  //Get Personal Info from SOE
  private getUserData(personal_number: any): void {
    this.headerService.getUserData(personal_number)
    .subscribe(
      (response) => {
        this.user = response
      }
    )
  }

  public logout(): void {
    // this.keycloakService.logout().then(() => this.keycloakService.clearToken());
    window.location.href = "https://dev-auth.gmf-aeroasia.co.id/auth/realms/spdoc/protocol/openid-connect/logout?";
  }
}
