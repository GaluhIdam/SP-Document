import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faChevronDown, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { EditDocumentSerivice } from './edit-spdocument.service';

@Component({
  selector: 'app-edit-spdocument',
  templateUrl: './edit-spdocument.component.html',
  styleUrls: ['./edit-spdocument.component.css']
})
export class EditSpdocumentComponent {
  constructor(
    private route: ActivatedRoute,
    private editdocumentService: EditDocumentSerivice,
    private router: Router
  ) { }
  faArrowLeft = faArrowLeft;
  faChevronDown = faChevronDown;
  faPenSquare = faPenSquare;
  faTrash = faTrash;

  id: any;

  id_document!: number;

  data: {
    id_description_remark: number | null
    quantity: Number | null;
    remark: String | null;
    description: String | null;
  }[] = [];

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


  mform: FormGroup = new FormGroup({
    sender_personal_number: new FormControl({ value: '', disabled: true }, [Validators.required]),
    sender_personal_name: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
    sender_unit: new FormControl({ value: '', disabled: true }, [Validators.required]),
    sender_date: new FormControl('', [Validators.required]),
    receiver_unit: new FormControl('', [Validators.required]),
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
    this.id = this.route.snapshot.paramMap.get('id_sp_data');
    this.showDocument(this.id)
  }

  public showDocument(id_sp_data: number) {
    this.editdocumentService.getShowData(id_sp_data)
      .subscribe(
        (response) => {
          this.data_show = response.spdoc_data_by_pk
          this.data = response.spdoc_data_by_pk.spdoc_description_remarks
          this.data_show.spdoc_description_remarks = response.spdoc_data_by_pk.spdoc_description_remarks
          this.mform.get('sender_personal_number')?.setValue(this.data_show.sender_personal_number)
          this.mform.get('sender_personal_name')?.setValue(this.data_show.sender_personal_name)
          this.mform.get('sender_unit')?.setValue(this.data_show.sender_unit)
          this.mform.get('sender_date')?.setValue(this.data_show.sender_date)
          this.mform.get('receiver_unit')?.setValue(this.data_show.receiver_unit)
        }
      )
  }

  public addValue() {
    if (this.document?.valid) {
      this.data.push({
        id_description_remark: null,
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

  public editDocument(i: number) {
    this.id_document = i;
    this.edit_document.get('quantity')?.setValue(this.data[i].quantity)
    this.edit_document.get('description')?.setValue(this.data[i].description)
    this.edit_document.get('remark')?.setValue(this.data[i].remark)
  }

  public saveEditDocument(i: number = this.id_document) {
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

  public clearForm() {
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
    receiver_unit: String = this.mform.get('receiver_unit')?.value,
  ) {
    if (this.mform.valid) {
      this.editdocumentService.updateDocument(
        id_sp_data,
        sender_date,
        receiver_unit,
      ).subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'Document has edited!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/view-spdocument/' + this.id]);
            }
          });
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

  public sendDescRemark(
    i: number = this.id_document,
    id_description_remark: number | null = this.data[i].id_description_remark,
    quantity: number = this.edit_document.get('quantity')?.value,
    description: String = this.edit_document.get('description')?.value,
    remark: String = this.edit_document.get('remark')?.value
  ) {
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
        }).then((result) => {
          if (result.isConfirmed) {
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
            (response) => {
              this.removeValue(i)
              Swal.fire({
                title: 'Success!',
                text: 'Description & Remark has deleted!',
                icon: 'success',
              }).then((result) => {
                if (result.isConfirmed) {
                  return response;
                }
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
  ) {
    if(this.document.valid) {
      this.addValue()
      this.editdocumentService.addDescMark(
        spdata_id,
        quantity,
        description,
        remark
      ).subscribe(
        (response) => {
          return response;
        }
      )
    } else {
      this.document.markAllAsTouched()
    }
  }
}
