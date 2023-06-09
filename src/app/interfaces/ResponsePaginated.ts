import { Cliente } from '../models/Cliente';
import { Usuario } from '../models/Usuario';
import { Pageable } from './Pageable';
import { Sort } from './Sort';

export interface ResponsePaginated {
  content: any[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
