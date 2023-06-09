import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditSpdocumentRoutingModule } from './edit-spdocument-routing.module';
import { EditSpdocumentComponent } from './edit-spdocument.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    EditSpdocumentComponent
  ],
  imports: [
    NgxDropzoneModule,
    CommonModule,
    EditSpdocumentRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ]
})
export class EditSpdocumentModule { }
