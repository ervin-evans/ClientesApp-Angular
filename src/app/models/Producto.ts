import { Categoria } from './Categoria';

export class Producto {
  id: number = 0;
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  stock: number = 0;
  fecha: string = '';
  image: string = '';
  categoria: Categoria = new Categoria();
}
