import { Sort } from './Sort';

export interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: true;
  unpaged: false;
}
