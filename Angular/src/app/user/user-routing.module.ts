import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordComponent } from './record/record.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  {
    path: 'user',
    children: [
      { path: 'record', component: RecordComponent },
      { path: 'register', component: RegisterComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
