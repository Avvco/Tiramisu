import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { RecordComponent } from './record/record.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { RecordHistoryComponent } from './record-history/record-history.component';

@NgModule({
  declarations: [
    RecordComponent,
    PatientRecordComponent,
    RecordHistoryComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class UserModule { }
