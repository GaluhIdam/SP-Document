import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSpdocumentRoutingModule } from './view-spdocument-routing.module';
import { ViewSpdocumentComponent } from './view-spdocument.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/core/services/rest.service';


@NgModule({
  declarations: [
    ViewSpdocumentComponent
  ],
  imports: [
    CommonModule,
    ViewSpdocumentRoutingModule,
    FontAwesomeModule
  ]
})
export class ViewSpdocumentModule {
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
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
  ) { }


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
