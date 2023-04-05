import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/models/Cliente';
import { Region } from 'src/app/models/Region';
import { Usuario } from 'src/app/models/Usuario';
import { ClienteService } from 'src/app/services/cliente.service';
import { ModalsService } from 'src/app/services/modals.service';
import { RegionesService } from 'src/app/services/regiones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() public tableColumns: string[] = [];
  @Input() public items: any = [];
  @Input() public actualPage: number = 1;
  @Input() public itemRow: any;

  protected imageUrl: string = '';
  protected regiones: Region[] = [];

  constructor(
    private regionesService: RegionesService,
    private clientesService: ClienteService,
    private usuariosService: UsuarioService,
    private modalService: ModalsService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    if (this.itemRow instanceof Cliente) {
      this.itemRow = new Cliente();
      this.imageUrl = environment.imageClientUrl;
      this.regionesService.getRegiones().subscribe({
        next: (regiones) => {
          this.regiones = regiones;
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'Oops!',
            text: 'Ha ocurrido un error al intentar cargar las regiones',
            icon: 'error',
          });
        },
      });
    } else if (this.itemRow instanceof Usuario) {
      this.itemRow = new Usuario();
      this.imageUrl = environment.imageUserUrl;
    }
  }

  public getSelectedItem(item: any): void {
    this.itemRow = item;
  }
  public delete(selectedItem: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Realmente deseas borrar a ${selectedItem.nombre} ${selectedItem.apellidoPaterno} ${selectedItem.apellidoMaterno}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.delete(selectedItem.id).subscribe({
          next: (resp) => {
            console.log(resp);
            this.items = this.items.filter((item: any) => {
              return item.id !== selectedItem.id;
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
              text: `Ha ocurrido un error al intentar eliminar a ${selectedItem.nombre} ${selectedItem.apellidoPaterno}! .`,
              icon: 'error',
            });
          },
        });
      }
    });
  }

  public updateTable(event: boolean): void {
    if (event && this.isCliente()) {
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
    } else if (event && !this.isCliente()) {
      this.spinner.show();
      console.log(
        'Vamos a actualizar la tabla en la pagina: ',
        this.actualPage
      );
      this.usuariosService.getUsuariosPaginated(this.actualPage).subscribe({
        next: (resp) => {
          if (resp) {
            this.spinner.hide();
            this.items = resp.content;
            this.actualPage = resp.number;
            console.log(this.items);
          }
        },
        error: (err) => {
          if (err) {
            this.spinner.hide();
          }
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'Hubo errores al recuperar los usuarios',
            icon: 'error',
          });
        },
      });
    }
  }
  public openModalUploadImage(cliente: any): void {
    this.modalService.openModal('modal-upload-image');
    this.itemRow = cliente;
  }

  public isCliente(): boolean {
    return this.itemRow instanceof Cliente;
  }
}
