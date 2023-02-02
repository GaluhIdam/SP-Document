import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateSpdocumentRoutingModule } from './create-spdocument-routing.module';
import { CreateSpdocumentComponent } from './create-spdocument.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateSpdocumentComponent
  ],
  imports: [
    CommonModule,
    CreateSpdocumentRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ]
})
export class CreateSpdocumentModule { }
