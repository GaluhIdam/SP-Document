import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faFilePdf, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ViewDocumentService } from './view-document.service';
import { SidebarService } from 'src/app/shared/components/sidebar/sidebar.service';
import { DashboardService } from '../dashboard/dashboard.service';
import Swal from 'sweetalert2';
import { CreateDocumentService } from '../create-spdocument/create-document.service';
import { KeycloakService } from 'keycloak-angular';
import { LayoutService } from 'src/app/shared/components/layout/layout.service';
import { FormControl, FormGroup } from '@angular/forms';
import { text } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-view-spdocument',
  templateUrl: './view-spdocument.component.html',
  styleUrls: ['./view-spdocument.component.css']
})
export class ViewSpdocumentComponent {
  faArrowLeft = faArrowLeft;
  faFilePdf = faFilePdf;
  faCircleCheck = faCircleCheck;
  personal_number!: string;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewdocumentService: ViewDocumentService,
    private sidebarService: SidebarService,
    private dashboardService: DashboardService,
    private createdocumentService: CreateDocumentService,
    private keycloakService: KeycloakService,
    private layoutService: LayoutService,
  ) { }

  id: any;

  data: any = {
    sender_personal_number: String,
    sender_personal_name: String,
    sender_unit: String,
    sender_date: Date,
    receiver_personal_number: String,
    receiver_personal_name: String,
    receiver_unit: String,
    receiver_date: Date,
  };

  //Data PDF
  sp_no: any;
  sender_by: any;
  receiver: any;
  sender: any;
  sender_name: any;
  sender_number: any;
  sender_date: any;
  data_pdf: any;
  status: any;
  file_location: any;
  link_image: String = '/assets/gmf-logo.webp'

  dateNow!: String

  id_notif: any

  mform: FormGroup = new FormGroup({
    receiver_unit_p: new FormControl(''),
    receiver_name_receive: new FormControl(),
    receiver_number_receive: new FormControl(),
  })

  ngOnInit() {
    this.initializeUserOptions()
    this.getUserData(this.personal_number)
    this.id = this.route.snapshot.paramMap.get('id_sp_data');
    this.route.queryParams.subscribe(params => {
      this.id_notif = params['id'];
    });
    this.showDocument(this.id)
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    this.dateNow = formattedDate
  }

  public showDocument(id_sp_data: number): void {
    this.viewdocumentService.getShowData(id_sp_data)
      .subscribe(
        (response) => {
          this.data = response.spdoc_data_by_pk
          this.sp_no = response.spdoc_data_by_pk.shipping_no
          this.data_pdf = response.spdoc_data_by_pk.spdoc_description_remarks
          this.receiver = response.spdoc_data_by_pk.receiver_unit
          this.sender = response.spdoc_data_by_pk.sender_unit
          this.sender_name = response.spdoc_data_by_pk.sender_personal_name
          this.sender_number = response.spdoc_data_by_pk.sender_personal_number
          this.sender_date = response.spdoc_data_by_pk.sender_date
          this.status = response.spdoc_data_by_pk.status
          this.file_location = response.spdoc_data_by_pk.file_location
        }
      )
  }

  public receiveSP(
    id_sp_data: any,
  ): void {
    Swal.fire({
      title: 'Receive',
      icon: 'question',
      text: 'Do you want to receive this document?',
      showCancelButton: true,
      confirmButtonText: 'Receive',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dashboardService.receiveDocument(
          id_sp_data,
          this.mform.get('receiver_number_receive')?.value,
          this.mform.get('receiver_name_receive')?.value,
          this.dateNow,
        ).subscribe((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Received',
            text: 'Document has Received!',
            showConfirmButton: false,
            timer: 1500
          }).then(
            () => {
              this.router.navigate(['/my-document']);
            }
          )
          this.readNotif(this.id_notif)
          this.sendNotif(this.mform.get('receiver_unit_p')?.value)
          return response
        })
      }
    })
  }

  public readNotif(id_notif: any): void {
    this.sidebarService.readNotif(id_notif).subscribe(
      (response) => {
        return response;
      }
    )
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
          this.mform.get('receiver_name_receive')?.setValue(response.personalName)
          this.mform.get('receiver_number_receive')?.setValue(response.personalNumber)
          this.mform.get('receiver_unit_p')?.setValue(response.unit)
        }
      )
  }

  public sendNotif(unit: any): void {
    this.createdocumentService.pushNotif(unit, 'true').subscribe(
      (response) => {
        return response
      }
    )
  }
}
