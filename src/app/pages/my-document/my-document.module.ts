import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyDocumentRoutingModule } from './my-document-routing.module';
import { MyDocumentComponent } from './my-document.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBarcodeModule } from 'ngx-barcode';


@NgModule({
  declarations: [
    MyDocumentComponent
  ],
  imports: [
    CommonModule,
    MyDocumentRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgxBarcodeModule
  ]
})
export class MyDocumentModule { }
