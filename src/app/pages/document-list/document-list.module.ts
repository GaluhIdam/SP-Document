import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentListRoutingModule } from './document-list-routing.module';
import { DocumentListComponent } from './document-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    DocumentListComponent
  ],
  imports: [
    CommonModule,
    DocumentListRoutingModule,
    FontAwesomeModule
  ]
})
export class DocumentListModule { }
