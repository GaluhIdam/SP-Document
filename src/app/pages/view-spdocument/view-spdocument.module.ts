import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSpdocumentRoutingModule } from './view-spdocument-routing.module';
import { ViewSpdocumentComponent } from './view-spdocument.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
export class ViewSpdocumentModule { }
