import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
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

  protected tableColumns: string[] = [
    'id',
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
