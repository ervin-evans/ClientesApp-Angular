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
  public delete(cliente: Cliente) {
    console.log(cliente);
    Swal.fire({
      title: 'Estas seguro?',
      text: `Realmente deseas borrar a ${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.delete(cliente.id).subscribe({
          next: (resp) => {
            console.log(resp);
            this.items = this.items.filter((item) => {
              return item.id !== cliente.id;
            });
            Swal.fire({
              title: 'Eliminado!',
              text: resp.msg,
              icon: 'success',
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Oops!',
              text: `Ha ocurrido un error al intentar eliminar a ${cliente.nombre} ${cliente.apellidoPaterno}! .`,
              icon: 'error',
            });
          },
        });
      }
    });
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
