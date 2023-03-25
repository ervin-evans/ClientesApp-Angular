import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: '**', component: ClientesComponent },
  { path: 'pageable', component: ClientesComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ClientesModule {}
