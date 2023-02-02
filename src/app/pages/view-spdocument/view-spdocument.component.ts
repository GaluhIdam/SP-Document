import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from 'src/app/core/services/rest.service';

@Component({
  selector: 'app-view-spdocument',
  templateUrl: './view-spdocument.component.html',
  styleUrls: ['./view-spdocument.component.css']
})
export class ViewSpdocumentComponent {
  faArrowLeft = faArrowLeft;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    ) {}

  id: any;

  data: any = {
    sender_personal_number: String,
    sender_personal_name: String,
    sender_unit: String,
    sender_date: Date,
    receiver_personal_number: String,
    receiver_personal_name: String,
    receiver_unit: Date,
    receiver_date: Date,
  };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id_sp_data');
    this.showDocument(this.id)
  }
  
  public showDocument(id_sp_data: number) {
    this.dashboardService.getShowData(id_sp_data)
      .subscribe(
        (response) => {
          this.data = response.spdoc_data_by_pk
          console.log(this.data)
        }
      )
  }
}
