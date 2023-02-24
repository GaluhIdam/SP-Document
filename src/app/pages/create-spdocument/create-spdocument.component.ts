import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faChevronDown, faPenSquare, faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { CreateDocument } from 'src/app/core/interfaces/create-sp-document.dto';
import { Router } from '@angular/router';
import { CreateDocumentService } from './create-document.service';
import { HeaderService } from 'src/app/shared/components/header/header.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-create-spdocument',
  templateUrl: './create-spdocument.component.html',
  styleUrls: ['./create-spdocument.component.css']
})
export class CreateSpdocumentComponent {

  constructor(
    private createdocumentService: CreateDocumentService,
    private keycloakService: KeycloakService,
    private headerService: HeaderService,
    private router: Router
  ) { }

  faArrowLeft = faArrowLeft;
  faChevronDown = faChevronDown;
  faPenSquare = faPenSquare;
  faTrash = faTrash;
  faMagnifyingGlass = faMagnifyingGlass;

  dateNow!: String
  personal_number!: String;
  personalName!: String;
  unit!: String;


  data: {
    quantity: Number | null;
    remark: String | null;
    description: String | null;
  }[] = [];


  status: String = "Open"

  id_spdoc!: any;
  id_document!: number;

  mform: FormGroup = new FormGroup({
    sender_personal_number: new FormControl({ value: this.personal_number, disabled: true }, [Validators.required, Validators.pattern('^[0-9]+$')]),
    sender_personal_name: new FormControl({ value: this.personalName, disabled: true }, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    sender_date: new FormControl({ value: this.dateNow, disabled: true }, [Validators.required]),
    sender_unit: new FormControl({ value: this.unit, disabled: true }, [Validators.required]),
    receiver_unit: new FormControl(''),
  });
  document: FormGroup = new FormGroup({
    quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    remark: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  edit_document: FormGroup = new FormGroup({
    quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    remark: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  ngOnInit() {
    this.initializeUserOptions()
    this.getUserData(this.personal_number)
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    this.dateNow = formattedDate

  }

  public submitDocument() {
    if (this.data.length > 0) {
      Swal.fire({
        title: 'Create It?',
        showDenyButton: true,
        text: "Are you sure want to create this document?",
        icon: 'question',
        denyButtonText: `Cancel`,
        confirmButtonText: 'Create'
      }).then((result) => {
        if (result.isConfirmed) {
          this.createdocumentService.getLastID()
            .subscribe(
              (response) => {
                if (response.spdoc_data.length > 0) {
                  this.id_spdoc = (parseInt(response.spdoc_data[0].shipping_no) + 1).toString().padStart(12, "0");
                  this.createDocument()
                }
                else {
                  this.id_spdoc = "000000000001"
                  this.createDocument()
                }
              }
            )
        }
      });
    } else {
      Swal.fire({
        title: 'Failed!',
        text: 'Please insert document!',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.mform.markAllAsTouched();
        }
      });
    }
  }

  private createDocument(
    sender_personal_number: Number = this.mform.controls['sender_personal_number'].value,
    sender_personal_name: String = this.mform.controls['sender_personal_name'].value,
    sender_date: Date = this.mform.controls['sender_date'].value,
    sender_unit: String = this.mform.controls['sender_unit'].value,
    receiver_unit: String = this.mform.controls['receiver_unit'].value,
    created_by: String = this.mform.controls['sender_personal_name'].value,
    status: String = this.status,
    shipping_no: number = this.id_spdoc,
    data: Array<CreateDocument> = this.data
  ): void {
    this.createdocumentService.createDocument(
      sender_personal_number,
      sender_personal_name,
      sender_date,
      sender_unit,
      receiver_unit,
      created_by,
      status,
      shipping_no,
      data,
    ).subscribe(
      (response) => {
        console.log(response)
        if(response.insert_spdoc_data.returning[0].receiver_unit != '' || null) {
          this.insertNotif(
            response.insert_spdoc_data.returning[0].id_sp_data,
            'false',
            'New SP Document',
            response.insert_spdoc_data.returning[0].receiver_unit
          )
        }
        Swal.fire({
          title: 'Success!',
          text: 'Document has created!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      }
    )
  }

  public editDocument(i: number) {
    this.id_document = i;
    this.edit_document.get('quantity')?.setValue(this.data[i].quantity)
    this.edit_document.get('description')?.setValue(this.data[i].description)
    this.edit_document.get('remark')?.setValue(this.data[i].remark)
  }

  public saveEditDocument(i: number = this.id_document) {
    this.data[i].quantity = this.edit_document.get('quantity')?.value;
    this.data[i].description = this.edit_document.get('description')?.value;
    this.data[i].remark = this.edit_document.get('remark')?.value;
  }

  public addValue() {
    if (this.document?.valid) {
      this.data.push({
        quantity: this.document.get('quantity')?.value,
        description: this.document.get('description')?.value,
        remark: this.document.get('remark')?.value,
      });
      this.clearSubDocument();
    } else {
      this.document.markAllAsTouched()
    }
  }


  public removeValue(i: number) {
    this.data.splice(i, 1)
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
        return response;
      }
    )
  }

  public clearForm(): void {
    this.mform.controls['sender_personal_number'].reset();
    this.mform.controls['sender_personal_name'].reset();
    this.mform.controls['sender_unit'].reset();
    this.mform.controls['sender_date'].reset();
    this.mform.controls['receiver_unit'].reset();
    this.clearSubDocument()
  }

  public clearSubDocument(): void {
    this.document.controls['quantity'].reset();
    this.document.controls['description'].reset();
    this.document.controls['remark'].reset();
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
          this.personalName = response.personalName
          this.unit = response.unit
        }
      )
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
}
