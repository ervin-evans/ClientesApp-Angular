import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() public tableColumns: string[] = [];
  @Input() public items: Cliente[] = [];
  constructor() {}
}
