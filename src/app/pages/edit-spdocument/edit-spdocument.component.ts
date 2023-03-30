import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faChevronDown, faMagnifyingGlass, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { KeycloakService } from 'keycloak-angular';
import { HeaderService } from 'src/app/shared/components/header/header.service';
import { SidebarService } from 'src/app/shared/components/sidebar/sidebar.service';
import Swal from 'sweetalert2';
import { CreateDocumentService } from '../create-spdocument/create-document.service';
import { EditDocumentSerivice } from './edit-spdocument.service';

@Component({
  selector: 'app-edit-spdocument',
  templateUrl: './edit-spdocument.component.html',
  styleUrls: ['./edit-spdocument.component.css']
})
export class EditSpdocumentComponent {
  check_notif: any;
  constructor(
    private route: ActivatedRoute,
    private editdocumentService: EditDocumentSerivice,
    private router: Router,
    private headerService: HeaderService,
    private keycloakService: KeycloakService,
    private createdocumentService: CreateDocumentService,
    private sidebarService: SidebarService,
  ) { }
  faArrowLeft = faArrowLeft;
  faChevronDown = faChevronDown;
  faPenSquare = faPenSquare;
  faTrash = faTrash;
  faMagnifyingGlass = faMagnifyingGlass;

  personal_number: any;

  sender_nopeg: any
  dateNow!: String

  id: any;

  id_document!: number;

  data: any;

  data_show: any = {
    sender_personal_number: String,
    sender_personal_name: String,
    sender_unit: String,
    sender_date: Date,
    receiver_personal_number: String,
    receiver_personal_name: String,
    receiver_unit: Date,
    receiver_date: Date,
  };

  file_location: any
  files: File[] = [];


  mform: FormGroup = new FormGroup({
    sender_personal_number: new FormControl({ value: '', disabled: true }, [Validators.required]),
    sender_personal_name: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    sender_unit: new FormControl({ value: '', disabled: true }, [Validators.required]),
    sender_date: new FormControl({ value: '', disabled: true }, [Validators.required]),
    receiver_personal_number: new FormControl({ value: '', disabled: true }),
    receiver_personal_name: new FormControl({ value: '', disabled: true }),
    receiver_unit: new FormControl(''),
    check_notif: new FormControl('')
  });
  document: FormGroup = new FormGroup({
    quantity: new FormControl('', [Validators.required]),
    remark: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  edit_document: FormGroup = new FormGroup({
    quantity: new FormControl('', [Validators.required]),
    remark: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  ngOnInit() {
    this.initializeUserOptions()
    this.getUserData(this.personal_number)
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    this.mform.get('sender_date')?.setValue(formattedDate)

    this.id = this.route.snapshot.paramMap.get('id_sp_data');
    this.showDocument(this.id)
    this.showDescRemark(this.id)
  }


  public showDocument(id_sp_data: number): void {
    this.editdocumentService.getShowData(id_sp_data)
      .subscribe(
        (response) => {
          this.data_show = response.spdoc_data_by_pk
          this.sender_nopeg = response.spdoc_data_by_pk.sender_personal_number
          if (this.personal_number != this.sender_nopeg) {
            this.router.navigate(['/document-list']);
          }
          this.mform.get('sender_personal_number')?.setValue(this.data_show.sender_personal_number)
          this.mform.get('sender_personal_name')?.setValue(this.data_show.sender_personal_name)
          this.mform.get('sender_unit')?.setValue(this.data_show.sender_unit)
          this.dateNow = this.data_show.sender_date
          this.mform.get('receiver_unit')?.setValue(this.data_show.receiver_unit)
          this.mform.get('receiver_personal_name')?.setValue(this.data_show.receiver_personal_name)
          this.mform.get('receiver_personal_number')?.setValue(this.data_show.receiver_personal_number)
          this.file_location = response.spdoc_data_by_pk.file_location
        }
      )
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelect(event: any) {
    this.files = [];
    this.files.push(...event.addedFiles);
    console.log(this.files)

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }
  }
  public showDescRemark(id_sp_data: number): void {
    this.editdocumentService.getDescRemark(id_sp_data)
      .subscribe(
        (response) => {
          this.data = response.spdoc_description_remark
        }
      )
  }

  public addValue(): void {
    this.showDescRemark(this.id)
    this.clearSubDocument();
  }

  public editDocument(i: number): void {
    this.id_document = i;
    this.edit_document.get('quantity')?.setValue(this.data[i].quantity)
    this.edit_document.get('description')?.setValue(this.data[i].description)
    this.edit_document.get('remark')?.setValue(this.data[i].remark)
  }

  public saveEditDocument(i: number = this.id_document): void {
    if (this.edit_document.valid) {
      Swal.fire({
        title: 'Save It?',
        showDenyButton: true,
        text: "If you save it, document can't be revert!",
        icon: 'question',
        denyButtonText: `Don't save`,
        confirmButtonText: 'Save'
      }).then((result) => {
        if (result.isConfirmed) {
          this.data[i].quantity = this.edit_document.get('quantity')?.value;
          this.data[i].description = this.edit_document.get('description')?.value;
          this.data[i].remark = this.edit_document.get('remark')?.value;
          this.sendDescRemark();
        }
      });
    } else {
      Swal.fire({
        title: 'Failed!',
        text: 'Validation Error!',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.mform.markAllAsTouched();
        }
      });
    }
  }

  public clearForm(): void {
    this.mform.get('sender_date')?.setValue(this.data_show.sender_date)
    this.mform.get('receiver_unit')?.setValue(this.data_show.receiver_unit)
    this.clearSubDocument()
  }

  public clearSubDocument() {
    this.document.controls['quantity'].reset();
    this.document.controls['description'].reset();
    this.document.controls['remark'].reset();
  }

  public sendEditDocument(
    id_sp_data: number = this.id,
    sender_date: Date = this.mform.get('sender_date')?.value,
    receiver_unit: String = this.mform.get('receiver_unit')?.value.toUpperCase(),
  ): void {
    if (this.mform.valid) {
      this.createdocumentService.uploadFile(this.files[0]).subscribe((res) => {
        this.editdocumentService.updateDocument(
          id_sp_data,
          sender_date,
          receiver_unit,
          res['file']['filename']
        ).subscribe(
          () => {
            Swal.fire({
              title: 'Success!',
              text: 'Document has edited!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.createdocumentService.checkNotif(id_sp_data)
                .subscribe(
                  (response) => {
                    if (response.spdoc_notif.length > 0) {
                      this.updateNotif(
                        id_sp_data,
                        'false',
                        'New SP Document',
                        receiver_unit
                      )
                      this.router.navigate(['/view-spdocument/' + this.id]);
                    } else if (receiver_unit != '' || null) {
                      this.insertNotif(
                        id_sp_data,
                        'false',
                        'New SP Document',
                        receiver_unit
                      )
                      this.router.navigate(['/view-spdocument/' + this.id]);
                    } else {
                      this.router.navigate(['/view-spdocument/' + this.id]);
                    }
                  }
                )
            });
          }
        )
      })
    } else {
      Swal.fire({
        title: 'Failed!',
        text: 'Validation Error!',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.mform.markAllAsTouched();
        }
      });
    }
  }

  public sendDescRemark(
    i: number = this.id_document,
    id_description_remark: number | null = this.data[i].id_description_remark,
    quantity: number = this.edit_document.get('quantity')?.value,
    description: String = this.edit_document.get('description')?.value,
    remark: String = this.edit_document.get('remark')?.value
  ): void {
    this.editdocumentService.updateDescRemark(
      id_description_remark,
      quantity,
      description,
      remark
    ).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Document has edited!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          if (result.isConfirmed) {
            this.showDescRemark(this.id)
            return response;
          }
        });
      }
    )
  }

  public deleteRemark(id_description_remark: number, i: number) {
    Swal.fire({
      title: 'Delete It?',
      showDenyButton: true,
      text: "If you save it, description & remark can't be revert!",
      icon: 'question',
      denyButtonText: `Cancel`,
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.editdocumentService.deleteDescRemark(id_description_remark)
          .subscribe(
            () => {
              Swal.fire({
                title: 'Success!',
                text: 'Description & Remark has deleted!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                this.showDescRemark(this.id)
              });
            }
          )
      } else {

      }
    });
  }

  public addRemark(
    spdata_id: number = this.id,
    quantity: number = this.document.get('quantity')?.value,
    description: String = this.document.get('description')?.value,
    remark: String = this.document.get('remark')?.value
  ): void {
    if (this.document.valid) {
      this.editdocumentService.addDescMark(
        spdata_id,
        quantity,
        description,
        remark
      ).subscribe(
        () => {
          this.addValue()
        }
      )
    } else {
      this.document.markAllAsTouched()
    }
  }

  public getUserReceiver(personal_number: any) {
    this.headerService.getUserData(personal_number)
      .subscribe(
        (response) => {
          this.mform.get('receiver_personal_name')?.setValue(response.personalName)
          this.mform.get('receiver_unit')?.setValue(response.unit)
        }
      )
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
          this.personal_number = response.personalNumber
        }
      )
  }

  //Notif
  private insertNotif(
    id_spdoc: any,
    status: any,
    title: any,
    unit: any
  ): void {
    this.createdocumentService.insertNotif(
      id_spdoc,
      status,
      title,
      unit
    ).subscribe(
      (response) => {
        this.sendNotif(unit)
        return response;
      }
    )
  }

  public sendNotif(unit: any): void {
    this.createdocumentService.pushNotif(unit, 'false').subscribe(
      (response) => {
        return response
      }
    )
  }

  private updateNotif(
    id_spdoc: any,
    status: any,
    title: any,
    unit: any
  ) {
    this.createdocumentService.updateNotif(
      id_spdoc,
      status,
      title,
      unit
    ).subscribe(
      (response) => {
        this.sendNotif(unit)
        return response
      }
    )
  }

  public getNotif(status: any, unit: any): void {
    this.sidebarService.getNotif(
      status, unit
    ).subscribe((response) => {
      return response
    })
  }
}
