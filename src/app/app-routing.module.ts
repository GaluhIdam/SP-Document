import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', data: {title: 'Dashboard'}, loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'document-list', data: {title: 'Document List'}, loadChildren: () => import('./pages/document-list/document-list.module').then(m => m.DocumentListModule) },
  { path: 'create-spdocument', data: {title: 'Create SP Document'}, loadChildren: () => import('./pages/create-spdocument/create-spdocument.module').then(m => m.CreateSpdocumentModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
