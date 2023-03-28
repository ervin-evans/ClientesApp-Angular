import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FacturasComponent } from './facturas/facturas.component';
import { ProductosComponent } from './productos/productos.component';
import { ComponentsModule } from '../components/components.module';
import { NgxSpinnerModule } from 'ngx-spinner/lib/ngx-spinner.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
