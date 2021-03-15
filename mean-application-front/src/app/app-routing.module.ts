import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/components/home/home.module')
      .then((m) => m.HomeModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../app/components/register/register.module')
      .then((m) => m.RegisterModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../app/components/login/login.module')
      .then((m) => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
