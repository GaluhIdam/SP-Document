import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', data: {title: 'Dashboard'}, loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'dashboard', data: {title: 'Dashboard'}, loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'document-list', data: {title: 'Document List'}, loadChildren: () => import('./pages/document-list/document-list.module').then(m => m.DocumentListModule) },
  { path: 'create-spdocument', data: {title: 'Create SP Document'}, loadChildren: () => import('./pages/create-spdocument/create-spdocument.module').then(m => m.CreateSpdocumentModule) },
  { path: 'edit-spdocument', data: {title: 'Edit SP Document'}, loadChildren: () => import('./pages/edit-spdocument/edit-spdocument.module').then(m => m.EditSpdocumentModule) },
  { path: 'view-spdocument', data: {title: 'View SP Document'}, loadChildren: () => import('./pages/view-spdocument/view-spdocument.module').then(m => m.ViewSpdocumentModule) },
  { path: 'notification', data: {title: 'Notification'}, loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule) },
  { path: 'login', data: {title: 'Login'}, loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: '**', data: {title: 'Dashboard'}, loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
