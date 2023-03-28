import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/models/Cliente';
import { Region } from 'src/app/models/region';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.css'],
})
export class ModalClientComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  cliente: Cliente = new Cliente();
  @Input()
  regiones: Region[] = [];
  private clienteToSave: Cliente = new Cliente();
  protected formCliente: FormGroup = new FormGroup([]);
  @Output()
  public isClienteUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private location: Location
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.formCliente = this.formBuilder.group({
      nombre: [
        this.cliente.nombre,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      apellidoPaterno: [
        this.cliente.apellidoPaterno,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      apellidoMaterno: [
        this.cliente.apellidoMaterno,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      region: [this.cliente.region.id, Validators.required],
      email: [
        this.cliente.email,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  public errors(fieldToValidate: string): boolean | undefined {
    return (
      this.formCliente.get(fieldToValidate)?.invalid &&
      (this.formCliente.get(fieldToValidate)?.dirty ||
        this.formCliente.get(fieldToValidate)?.touched)
    );
  }

  public update(): void {
    const { nombre, email, apellidoPaterno, apellidoMaterno, region } =
      this.formCliente.value;
    this.clienteToSave.id = this.cliente.id;
    this.clienteToSave.nombre = nombre;
    this.clienteToSave.apellidoPaterno = apellidoPaterno;
    this.clienteToSave.apellidoMaterno = apellidoMaterno;
    this.clienteToSave.email = email;
    this.clienteToSave.region.id = +region;
    console.log(this.clienteToSave);
    this.spinner.show();
    this.clienteService.update(this.clienteToSave).subscribe({
      next: (resp) => {
        this.spinner.hide();
        this.isClienteUpdated.emit(true);
        Swal.fire({
          title: 'En horabuena!',
          text: resp.msg || `El cliente se ha actualizado satisfactoriamente`,
          icon: 'success',
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          title: 'Oops!',
          text: `Hubo un error al intentar guardar al cliente porque ${err.error.msg}`,
          icon: 'error',
        });
      },
    });
  }
}
