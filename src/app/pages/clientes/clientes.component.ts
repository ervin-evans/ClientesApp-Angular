import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/models/Cliente';
import { Region } from 'src/app/models/region';
import { ClienteService } from 'src/app/services/cliente.service';
import { ModalsService } from 'src/app/services/modals.service';
import { RegionesService } from 'src/app/services/regiones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  protected title: string = 'Clientes';
  protected total: number = 0;
  protected totalPages: number = 0;
  protected pagesTemp: number[] = [];
  protected pages: number[] = [];
  protected actualPage: number = 1;
  protected isLastPage: boolean = false;
  protected clientes: Cliente[] = [];
  protected isLoading: boolean = false;

  public cliente: Cliente = new Cliente();
  public regiones: Region[] = [];

  protected tableColumns: string[] = [
    'id',
    'Imagen',
    'Nombre',
    'Apellido Paterno',
    'Apellido Materno',
    'Region',
    'E-mail',
    'Creado',
    'Acciones',
  ];
  constructor(
    private clientesService: ClienteService,
    private regionesService: RegionesService,
    private modalService: ModalsService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.loadPaginatedClients(this.actualPage);
  }

  private loadPaginatedClients(page: number) {
    this.spinner.show();
    this.clientesService.getPaginatedClients(page).subscribe({
      next: (resp) => {
        if (resp) {
          this.spinner.hide();
        }
        console.log(resp.content);
        this.pages = [];
        this.clientes = resp.content;
        this.total = resp.totalElements;
        this.totalPages = resp.totalPages;
        this.isLastPage = resp.last;
        this.pagesTemp = new Array(this.totalPages);
        //pages
        this.pagesTemp.fill(2, 0, this.totalPages).map((number, index) => {
          this.pages.push(index + 1);
        });
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

  public updateTable(isSaved: boolean) {}
  public loadRegiones(): void {
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
  }
  public openModal(): void {
    this.cliente = new Cliente();
    this.cliente.region.id = 1;
    this.modalService.openModal('exampleModal');
  }
  public paginated(page: number) {
    if (this.actualPage !== page) {
      this.actualPage = page;
      this.loadPaginatedClients(this.actualPage);
    }
  }
  public goToPreviosPage(previosPage: number) {
    this.actualPage = previosPage;
    this.loadPaginatedClients(this.actualPage);
  }
  public goToNextPage(nextPage: number) {
    this.actualPage = nextPage;
    this.loadPaginatedClients(this.actualPage);
  }
}
