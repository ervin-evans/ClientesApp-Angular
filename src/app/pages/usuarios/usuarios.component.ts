import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  public title: String = 'Usuarios';

  protected total: number = 0;
  protected totalPages: number = 0;
  protected pagesTemp: number[] = [];
  protected pages: number[] = [];
  protected actualPage: number = 1;
  protected isLastPage: boolean = false;
  protected usuarios: Usuario[] = [];
  protected usuario: Usuario = new Usuario();
  protected isLoading: boolean = false;
  protected tableColumns: string[] = [
    'id',
    'Imagen',
    'Nombre',
    'Apellido Paterno',
    'Apellido Materno',
    'Username',
    'Activo',
    'Acciones',
  ];

  constructor(
    private usuariosService: UsuarioService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.loadPaginatedUsers(this.actualPage);
  }
  private loadPaginatedUsers(page: number) {
    this.spinner.show();
    this.usuariosService.getUsuariosPaginated(0).subscribe({
      next: (resp) => {
        if (resp) {
          this.spinner.hide();
        }
        console.log(resp.content);
        this.total = resp.totalElements;
        this.usuarios = resp.content;
        this.totalPages = resp.totalPages;
        this.isLastPage = resp.last;
        this.pagesTemp = new Array(this.totalPages);
        //pages
        this.pagesTemp.fill(2, 0, this.totalPages).map((number, index) => {
          this.pages.push(index + 1);
        });
      },
      error: (err) => {
        console.log('Error al obtener los usuarios porque ', err);
        if (err) {
          this.spinner.hide();
        }
        Swal.fire({
          title: 'Error',
          text: 'Hubo errores al recuperar los usuarios',
          icon: 'error',
        });
      },
    });
  }
  public paginated(page: number) {
    if (this.actualPage !== page) {
      this.actualPage = page;
      this.loadPaginatedUsers(this.actualPage);
    }
  }
  public goToPreviosPage(previosPage: number) {
    this.actualPage = previosPage;
    this.loadPaginatedUsers(this.actualPage);
  }
  public goToNextPage(nextPage: number) {
    this.actualPage = nextPage;
    this.loadPaginatedUsers(this.actualPage);
  }
}
