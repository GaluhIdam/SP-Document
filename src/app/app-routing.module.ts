import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/utility/app.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', data: {title: 'Dashboard'}, loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'document-list', data: {title: 'Document List'}, loadChildren: () => import('./pages/document-list/document-list.module').then(m => m.DocumentListModule), canActivate: [AuthGuard] },
  { path: 'create-spdocument', data: {title: 'Create SP Document'}, loadChildren: () => import('./pages/create-spdocument/create-spdocument.module').then(m => m.CreateSpdocumentModule), canActivate: [AuthGuard] },
  { path: 'edit-spdocument/:id_sp_data', data: {title: 'Edit SP Document'}, loadChildren: () => import('./pages/edit-spdocument/edit-spdocument.module').then(m => m.EditSpdocumentModule), canActivate: [AuthGuard] },
  { path: 'view-spdocument/:id_sp_data', data: {title: 'View SP Document'}, loadChildren: () => import('./pages/view-spdocument/view-spdocument.module').then(m => m.ViewSpdocumentModule), canActivate: [AuthGuard] },
  { path: 'notification', data: {title: 'Notification'}, loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule), canActivate: [AuthGuard] },
  { path: '**', data: {title: 'Dashboard'}, loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
