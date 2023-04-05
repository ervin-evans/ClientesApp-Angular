import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cliente } from 'src/app/models/Cliente';
import { Region } from 'src/app/models/Region';
import { ClienteService } from 'src/app/services/cliente.service';
import { ModalsService } from 'src/app/services/modals.service';
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
  @Output()
  public isClienteUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  public modalTitle: string = '';

  private clienteToSave: Cliente = new Cliente();
  protected formCliente: FormGroup = new FormGroup([]);

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private modalService: ModalsService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente']) {
      const { id } = changes['cliente'].currentValue;
      if (id === 0) {
        this.modalTitle = 'Agregar cliente';
      } else {
        this.modalTitle = 'Actualizar cliente';
      }
    }
    this.createForm();
  }
  private createForm(): void {
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
    this.setCliente(nombre, apellidoPaterno, apellidoMaterno, email, region);
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

  public save(): void {
    const { nombre, email, apellidoPaterno, apellidoMaterno, region } =
      this.formCliente.value;
    this.setCliente(nombre, apellidoPaterno, apellidoMaterno, email, region);
    console.log('Vamos a guardar un cliente', this.clienteToSave);
    this.clienteService.save(this.clienteToSave).subscribe({
      next: (resp) => {
        console.log(resp);
        this.isClienteUpdated.emit(true);
        this.modalService.closeModal();
        Swal.fire({
          title: 'Enhora buena!',
          text: resp.msg,
          icon: 'success',
        });
      },
      error: (err) => {
        console.log(err),
          Swal.fire({
            title: 'Oops!',
            text: err.error.msg,
            icon: 'error',
          });
      },
    });
  }

  private setCliente(
    nombre: string = '',
    apellidoPaterno: string = '',
    apellidoMaterno: string = '',
    email: string = '',
    regionId: string = ''
  ) {
    this.clienteToSave.id = this.cliente.id;
    this.clienteToSave.nombre = nombre;
    this.clienteToSave.apellidoPaterno = apellidoPaterno;
    this.clienteToSave.apellidoMaterno = apellidoMaterno;
    this.clienteToSave.email = email;
    this.clienteToSave.region.id = +regionId;
  }
}
