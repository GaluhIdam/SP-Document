import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditSpdocumentRoutingModule } from './edit-spdocument-routing.module';
import { EditSpdocumentComponent } from './edit-spdocument.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    EditSpdocumentComponent
  ],
  imports: [
    CommonModule,
    EditSpdocumentRoutingModule,
    FontAwesomeModule
  ]
})
export class EditSpdocumentModule { }
