import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./pages/clientes/clientes-routing.module').then(
        (m) => m.ClientesModule
      ),
  },
  { path: 'facturas', component: FacturasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: '', component: UsuariosComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];
``;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
