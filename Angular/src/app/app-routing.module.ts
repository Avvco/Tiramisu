import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecordComponent } from './user/record/record.component';
import { RegisterComponent } from './register/register.component';
import { PatientRecordComponent } from './user/patient-record/patient-record.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: 'user',
    children: [
      { path: 'record', component: RecordComponent },
      { path: 'patient-record', component: PatientRecordComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
