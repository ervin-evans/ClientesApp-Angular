import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchBarComponent, TableComponent, PaginationComponent],
  imports: [CommonModule, RouterModule],
  exports: [SearchBarComponent, TableComponent, PaginationComponent],
})
export class ComponentsModule {}
