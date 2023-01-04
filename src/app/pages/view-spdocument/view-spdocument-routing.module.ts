import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSpdocumentComponent } from './view-spdocument.component';

const routes: Routes = [{ path: '', component: ViewSpdocumentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSpdocumentRoutingModule { }
