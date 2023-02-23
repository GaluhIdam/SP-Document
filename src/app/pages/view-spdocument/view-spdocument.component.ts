import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ViewDocumentService } from './view-document.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-spdocument',
  templateUrl: './view-spdocument.component.html',
  styleUrls: ['./view-spdocument.component.css']
})
export class ViewSpdocumentComponent {
  faArrowLeft = faArrowLeft;
  faFilePdf = faFilePdf;

  constructor(
    private route: ActivatedRoute,
    private viewdocumentService: ViewDocumentService,
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
  link_image: String = '/assets/gmf-logo.webp'

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id_sp_data');
    this.showDocument(this.id)
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
        }
      )
  }
}
