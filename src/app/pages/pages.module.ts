import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FacturasComponent } from './facturas/facturas.component';
import { ProductosComponent } from './productos/productos.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    UsuariosComponent,
    ClientesComponent,
    FacturasComponent,
    ProductosComponent,
  ],
  imports: [CommonModule, ComponentsModule],
  exports: [UsuariosComponent],
})
export class PagesModule {}
