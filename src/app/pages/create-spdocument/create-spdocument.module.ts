import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CreateSpdocumentRoutingModule } from './create-spdocument-routing.module';
import { CreateSpdocumentComponent } from './create-spdocument.component';

@NgModule({
  declarations: [CreateSpdocumentComponent],
  imports: [
    NgxDropzoneModule,
    CommonModule,
    CreateSpdocumentRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
})
export class CreateSpdocumentModule {}
