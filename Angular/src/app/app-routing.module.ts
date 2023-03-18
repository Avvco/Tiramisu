import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecordComponent } from './user/record/record.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  {
    path: 'user',
    children: [
      { path: 'record', component: RecordComponent },
      { path: 'register', component: RegisterComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
