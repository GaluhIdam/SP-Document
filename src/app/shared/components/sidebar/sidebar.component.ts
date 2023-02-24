import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faAngleRight, faBell, faChevronDown, faRightFromBracket, faHouse, faTicketSimple, faInbox, faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { KeycloakService } from 'keycloak-angular';
import { interval } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { baseURL } from 'src/app/core/services/baseURL';
import { LayoutService } from '../layout/layout.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  faAngleRight = faAngleRight;
  faBell = faBell;
  faChevronDown = faChevronDown;
  faRightFromBracket = faRightFromBracket;
  faBars = faBars;

  faHouse = faHouse;
  faTicketSimple = faTicketSimple;
  faInbox = faInbox;
  faPlus = faPlus;

  url_local: any = 'http://localhost:4200'
  title: any;

  notif: any = {
    spdoc_notif: []
  };

  personal_number: any;
  user: any = {
    personalName: String,
    unit: String,
  };

  mform: FormGroup = new FormGroup({
    receiver_unit_p: new FormControl(''),
  })

  photo: any;
  photo_default: any = 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg';
  navbar: boolean = true;

  //Base URL
  base_url: String = baseURL.BASE_URL
  //Routes
  urlNotif: any = this.base_url + 'get-notif';

  //Credentials
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Hasura-Client-Name', 'hasura-console')
    .set('x-hasura-admin-secret', 'h4sur4forB3tt3r4pi');

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private keycloakService: KeycloakService,
    private layoutService: LayoutService,
    private http: HttpClient,
    private sidebarService: SidebarService
  ) {
  }

  ngOnInit() {
    this.initializeUserOptions()
    this.getUserData(this.personal_number)
    this.photo = 'https://talentlead.gmf-aeroasia.co.id/images/avatar/' + this.personal_number + '.jpg';
    this.activatedRoute.data.subscribe(data => {
      this.title = data;
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

  startPolling(
    status: any,
    unit: any,
  ) {

    const params = new HttpParams()
      .set('status', status)
      .set('unit', unit);

    interval(500).pipe(
      switchMap(() => this.http.get(this.urlNotif, { 'params': params, 'headers': this.headers }))
    ).subscribe((response) => {
      this.notif = response
    });
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
    this.layoutService.getUserData(personal_number)
      .subscribe(
        (response) => {
          this.user = response
          this.mform.get('receiver_unit_p')?.setValue(response.unit)
          this.startPolling('false', this.mform.get('receiver_unit_p')?.value)
        }
      )
  }

  public logout(): void {
    this.keycloakService.logout().then(() => this.keycloakService.clearToken());
  }

  public showHide() {
    if (this.navbar == false) {
      this.navbar = true;
    } else {
      this.navbar = false;
    }
  }

  public showDocument(id_sp_data: number, id_notif: any): void {
    this.readNotif(id_notif)
    this.router.navigate(['/view-spdocument/' + id_sp_data]);
  }

  public readNotif(id_notif: any): void {
    this.sidebarService.readNotif(id_notif).subscribe(
      (response) => {
        return response;
      }
    )
  } 
}
