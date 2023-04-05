import { Cliente } from '../models/Cliente';
import { Usuario } from '../models/Usuario';

export interface CustomResponse {
  cliente?: Cliente;
  usuario?: Usuario;
  msg?: string;
  errors?: string;
}
