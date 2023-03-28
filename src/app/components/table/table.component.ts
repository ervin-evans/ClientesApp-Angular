import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/models/Cliente';
import { Region } from 'src/app/models/region';
import { ClienteService } from 'src/app/services/cliente.service';
import { RegionesService } from 'src/app/services/regiones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() public tableColumns: string[] = [];
  @Input() public items: Cliente[] = [];
  @Input() public actualPage: number = 1;
  protected regiones: Region[] = [];
  protected cliente: Cliente = new Cliente();
  constructor(
    private regionesService: RegionesService,
    private clientesService: ClienteService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.regionesService.getRegiones().subscribe((regiones) => {
      this.regiones = regiones;
    });
  }

  public getSelectedClient(cliente: Cliente): void {
    this.cliente = cliente;
  }

  public updateTable(event: boolean): void {
    if (event) {
      this.spinner.show();
      this.clientesService.getPaginatedClients(this.actualPage).subscribe({
        next: (resp) => {
          if (resp) {
            this.spinner.hide();
          }
          this.items = resp.content;
          this.actualPage = resp.number;
        },
        error: (err) => {
          if (err) {
            this.spinner.hide();
          }
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'Hubo errores al recuperar los clientes',
            icon: 'error',
          });
        },
      });
    }
  }
}
