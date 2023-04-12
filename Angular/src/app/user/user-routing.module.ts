import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordComponent } from './record/record.component';
import { AppComponent } from '../app.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  {
    path: 'user',
    children: [
      { path: 'record', component: RecordComponent },
      { path: 'patient-record', component: PatientRecordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
