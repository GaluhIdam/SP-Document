import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSpdocumentComponent } from './edit-spdocument.component';

const routes: Routes = [{ path: '', component: EditSpdocumentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSpdocumentRoutingModule { }
