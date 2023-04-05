import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { ModalsService } from 'src/app/services/modals.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent {
  protected modalTitle: string = 'Agregar usuario';
  protected userForm: FormGroup = new FormGroup({});
  @Input() usuario: Usuario = new Usuario();
  @Output() protected isUserUpdated: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private modalService: ModalsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.userForm = this.formBuilder.group({
      nombre: [
        this.usuario.nombre,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      apellidoPaterno: [
        this.usuario.apellidoPaterno,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      apellidoMaterno: [
        this.usuario.apellidoMaterno,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      username: [
        this.usuario.username,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        this.usuario.password,
        [Validators.required, Validators.minLength(6)],
      ],
      enabled: [this.usuario.enabled],
    });
  }

  public errors(fieldToValidate: string): boolean | undefined {
    return (
      this.userForm.get(fieldToValidate)?.invalid &&
      (this.userForm.get(fieldToValidate)?.dirty ||
        this.userForm.get(fieldToValidate)?.touched)
    );
  }
  public save(): void {
    this.usuario.nombre = this.userForm.value.nombre;
    this.usuario.apellidoPaterno = this.userForm.value.apellidoPaterno;
    this.usuario.apellidoMaterno = this.userForm.value.apellidoMaterno;
    this.usuario.username = this.userForm.value.username;
    this.usuario.password = this.userForm.value.password;
    this.usuarioService.save(this.usuario).subscribe({
      next: (resp) => {
        Swal.fire({
          title: 'Enhorabuena!',
          text: resp.msg,
          icon: 'success',
        });
        //TODO:Cerrar el modal
        this.modalService.closeModal();
        //TODO:Actualizar la tabla
        this.isUserUpdated.emit(true);
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          title: 'Oops!',
          text: err.error.msg,
          icon: 'error',
        });
      },
    });
  }
  public update(): void {}
}
