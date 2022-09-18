import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';

import { ShareModule } from '../share/share.module';
import { RecordComponent } from './record/record.component';

@NgModule({
  declarations: [
    LoginComponent,
    RecordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule,
  ]
})
export class UserModule { }
