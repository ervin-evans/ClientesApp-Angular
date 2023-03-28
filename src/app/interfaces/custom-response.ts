import { Cliente } from '../models/Cliente';

export interface CustomResponse {
  cliente?: Cliente;
  msg?: string;
}
