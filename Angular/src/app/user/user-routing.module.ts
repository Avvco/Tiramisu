import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordComponent } from './record/record.component';
import { AppComponent } from '../app.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { RecordHistoryComponent } from './record-history/record-history.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  {
    path: 'user',
    children: [
      { path: 'record', component: RecordComponent },
      { path: 'patient-record', component: PatientRecordComponent },
      { path: 'record-history', component: RecordHistoryComponent },
      { path: 'patient-history', component: PatientHistoryComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
