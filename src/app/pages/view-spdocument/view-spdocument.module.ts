import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewSpdocumentComponent } from './view-spdocument.component';
import { ViewSpdocumentRoutingModule } from './view-spdocument-routing.module';
import { NgxBarcodeModule } from 'ngx-barcode';


@NgModule({
  declarations: [
    ViewSpdocumentComponent
  ],
  imports: [
    CommonModule,
    ViewSpdocumentRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgxBarcodeModule
  ]
})
export class ViewSpdocumentModule { }
