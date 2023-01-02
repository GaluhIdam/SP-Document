import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentListRoutingModule } from './document-list-routing.module';
import { DocumentListComponent } from './document-list.component';


@NgModule({
  declarations: [
    DocumentListComponent
  ],
  imports: [
    CommonModule,
    DocumentListRoutingModule
  ]
})
export class DocumentListModule { }
