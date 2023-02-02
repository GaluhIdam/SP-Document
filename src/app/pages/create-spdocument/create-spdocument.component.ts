import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faChevronDown, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { CreateDocument } from 'src/app/core/interfaces/create-sp-document.dto';
import { DashboardService } from 'src/app/core/services/rest.service';
import { Router } from '@angular/router';

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


  data: {
    quantity: Number | null;
    remark: String | null;
    description: String | null;
  }[] = [];

  receiver_personal_name: String = "";
  receiver_personal_number: String = "";
  receiver_date: String = "";

  status: String = "Open"

  myDate = new Date()
  id_spdoc!: any;

  mform: FormGroup = new FormGroup({
    sender_personal_number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    sender_personal_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    sender_date: new FormControl('', [Validators.required]),
    sender_unit: new FormControl('', [Validators.required]),
    receiver_unit: new FormControl('', [Validators.required]),
  });
  document: FormGroup = new FormGroup({
    quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    remark: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  public submitDocument() {
    if (this.mform.valid) {
      this.dashboardService.getLastID()
        .subscribe(
          (response) => {
            if (response.spdoc_data.length > 0) {
              this.id_spdoc = (parseInt(response.spdoc_data[0].shipping_no) + 1).toString().padStart(12, "0");
              this.createDocument()
              console.log(this.id_spdoc)
            }
            else {
              this.id_spdoc = "000000000001"
              this.createDocument()
            }
          }
        )
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

  public createDocument(
    sender_personal_number: Number = this.mform.controls['sender_personal_number'].value,
    sender_personal_name: String = this.mform.controls['sender_personal_name'].value,
    sender_date: Date = this.mform.controls['sender_date'].value,
    sender_unit: String = this.mform.controls['sender_unit'].value,
    receiver_unit: String = this.mform.controls['receiver_unit'].value,
    created_by: String = this.mform.controls['sender_personal_name'].value,
    status: String = this.status,
    shipping_no: number = this.id_spdoc,
    data: Array<CreateDocument> = this.data
  ) {
    this.dashboardService.createDocument(
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
      (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Document has created!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/document-list']);
          }
        });
        console.log(data)
      },
      () => {
        Swal.fire({
          title: 'Failed!',
          text: 'Document has failed to create!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    )
  }

  public addValue() {
    if (this.document?.valid) {
      this.data.push({
        quantity: this.document.get('quantity')?.value,
        description: this.document.get('description')?.value,
        remark: this.document.get('remark')?.value,
      });
      this.clearSubDocument();
    }
  }


  public removeValue(i: number) {
    this.data.splice(i, 1)
  }

  public clearForm() {
    this.mform.controls['sender_personal_number'].reset();
    this.mform.controls['sender_personal_name'].reset();
    this.mform.controls['sender_unit'].reset();
    this.mform.controls['sender_date'].reset();
    this.mform.controls['receiver_unit'].reset();
    this.clearSubDocument()
  }

  public clearSubDocument() {
    this.document.controls['quantity'].reset();
    this.document.controls['description'].reset();
    this.document.controls['remark'].reset();
  }

  public onSubmit() {
    if (this.mform.valid) {
      console.log(this.mform)
    }
  }
}
