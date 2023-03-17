import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordComponent } from './user/record/record.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [{
  path: '', children: [
    {
      path: 'user',
      children: [
        { path: 'record', component: RecordComponent },
        { path: 'register', component: RegisterComponent },
  
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
