import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MjComponent } from './mj/mj.component';


const routes: Routes = [
  { path: 'MJ', component: MjComponent},
  { path: '**', redirectTo: 'MJ'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
