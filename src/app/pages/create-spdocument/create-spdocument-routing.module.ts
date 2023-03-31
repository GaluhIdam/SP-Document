import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSpdocumentComponent } from './create-spdocument.component';

const routes: Routes = [{ path: '', component: CreateSpdocumentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateSpdocumentRoutingModule { }
