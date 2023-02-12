import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentListRoutingModule } from './document-list-routing.module';
import { DocumentListComponent } from './document-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxBarcodeModule } from 'ngx-barcode';


@NgModule({
  declarations: [
    DocumentListComponent
  ],
  imports: [
    CommonModule,
    DocumentListRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgxBarcodeModule
  ],
  exports: [
  ]
})
export class DocumentListModule { }
