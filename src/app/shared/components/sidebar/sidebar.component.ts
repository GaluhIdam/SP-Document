import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faAngleRight, faBell, faChevronDown, faRightFromBracket, faHouse, faTicketSimple, faInbox, faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { io } from 'socket.io-client';
import { baseURL } from 'src/app/core/services/baseURL';
import Swal from 'sweetalert2';
import { LayoutService } from '../layout/layout.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  socket: any;

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

  //Credentials
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Hasura-Client-Name', 'hasura-console')
    .set('x-hasura-admin-secret', 'h4sur4forB3tt3r4pi');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private keycloakService: KeycloakService,
    private layoutService: LayoutService,
    private sidebarService: SidebarService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.initializeUserOptions()
    this.getUserData(this.personal_number)
    this.checkphoto(this.personal_number)
    this.getRealtimeNotif()
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
  private checkphoto(personal_number: any) {
    const imageUrl = `https://talentlead.gmf-aeroasia.co.id/images/avatar/${personal_number}.jpg`;

    const img = new Image();
    img.onload = () => {
      console.log(`Image exists at ${imageUrl}`);
      this.photo = imageUrl;
    };
    img.onerror = () => {
      console.log(`Image doesn't exist at ${imageUrl}`);
      const defaultImageUrl = 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg';
      this.photo = defaultImageUrl;
    };
    img.src = imageUrl;
  }



  public getNotif(status: any, unit: any): void {
    this.sidebarService.getNotif(
      status, unit
    ).subscribe((response) => {
      this.notif = response
    })
  }

  private getChild(activatedRoute: ActivatedRoute): any {
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
          this.user = response.body
          this.mform.get('receiver_unit_p')?.setValue(response.body.personalUnit)
          this.getNotif('false', this.mform.get('receiver_unit_p')?.value)
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

  public showDocument(id_sp_data: number, id_notif: number): void {
    this.router.navigate(['/view-spdocument/' + id_sp_data], { queryParams: { id: id_notif } });
  }

  private getRealtimeNotif() {
    this.socket = io('https://utils.gmf-aeroasia.co.id');
    // this.socket = io('http://172.16.41.107:8380');
    this.socket.on('connect', () => {
      console.log('Connected');
    });
    //Get Data Socket
    this.socket.on('notification/spdoc', (data: any) => {
      if (data.data.unit == this.mform.get('receiver_unit_p')?.value && data.data.status == 'false') {
        this.getNotif('false', this.mform.get('receiver_unit_p')?.value)
        this.toastr.info('New SP Document', 'Notification');
      } else {
        this.getNotif('false', this.mform.get('receiver_unit_p')?.value)
      }
    });
    this.socket.on('events', function (data: any) {
      console.log('event', data);
    });
    this.socket.on('exception', function (data: any) {
      console.log('event', data);
    });
    this.socket.on('disconnect', function () {
      console.log('Disconnected');
    });
  }
}
