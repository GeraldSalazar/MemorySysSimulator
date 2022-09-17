import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimIndexComponent } from './gui/sim-index/sim-index.component';

const routes: Routes = [
  {path: 'simulator', component: SimIndexComponent},
  {path: '', redirectTo: 'simulator', pathMatch: 'full'},
  {path: '**', redirectTo: 'simulator'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
