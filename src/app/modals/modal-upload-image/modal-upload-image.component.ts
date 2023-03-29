import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ImageService } from 'src/app/services/image.service';
import { ModalsService } from 'src/app/services/modals.service';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload-image',
  templateUrl: './modal-upload-image.component.html',
  styleUrls: ['./modal-upload-image.component.css'],
})
export class ModalUploadImageComponent implements OnInit {
  @ViewChild('fileInput', { read: ElementRef })
  fileInput: ElementRef<HTMLInputElement> = {} as ElementRef;
  @Input() public cliente: Cliente = new Cliente();
  @Input() public imageClientUrl: string = '';

  protected tempImageUrl!: string | ArrayBuffer | null;
  protected isImageChanged: boolean = false;
  protected imageUploadProgress: number = 0;
  protected messageInfo: string = '';
  private file!: File | undefined;
  protected isImageUploading: boolean = false;
  protected buttonTitle = 'Cancelar';

  constructor(
    private modalService: ModalsService,
    private imageService: ImageService
  ) {}
  ngOnInit(): void {}
  ngOnFileChange(event: any) {
    if (this.imageUploadProgress !== 0) this.imageUploadProgress = 0;
    this.file = event.target.files[0];
    if (this.file) {
      if (this.file.size > environment.permittedImageSize) {
        this.tempImageUrl = null;
        Swal.fire({
          title: 'Oops!',
          text: 'El archivo es mas grande de lo permitido (2MB)',
          icon: 'error',
        });
        return;
      }
      const permitedImageExtensiona = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!permitedImageExtensiona.includes(this.file.type)) {
        this.tempImageUrl = null;
        Swal.fire({
          title: 'Oops!',
          text: 'El archivo no es una imagen',
          icon: 'error',
        });
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.tempImageUrl = reader.result;
      };
      this.isImageChanged = true;
    }
  }

  public uploadImage(): void {
    if (this.file !== undefined) {
      this.imageService
        .uploadImage(this.file, String(this.cliente.id))
        .subscribe({
          next: (httpEvent) => {
            if (httpEvent.type === HttpEventType.UploadProgress) {
              if (httpEvent.total) {
                this.isImageUploading = true;
                this.imageUploadProgress = Math.round(
                  (100 * httpEvent.loaded) / httpEvent.total
                );
                console.log(this.imageUploadProgress);
                if (this.imageUploadProgress === 100) {
                  this.buttonTitle = 'Salir';
                  this.messageInfo = 'La imagen se ha cargado exitosamente!';
                }
              }
            } else if (httpEvent instanceof HttpResponse) {
              this.messageInfo = httpEvent.body.msg;
            }
          },
          error: (err) => {
            this.imageUploadProgress = 0;
            this.isImageUploading = false;
            this.messageInfo = 'No se pudo cargar la imagen';
            console.log(err);
            Swal.fire({
              title: 'Oops!',
              text: this.messageInfo,
              icon: 'error',
            });
          },
        });
      this.isImageChanged = false;
    }
  }

  public closeModal() {
    this.messageInfo = '';
    this.isImageUploading = false;
    this.isImageChanged = false;
    this.file = undefined;
    this.fileInput.nativeElement.value = '';
    this.tempImageUrl = null;
    this.modalService.closeModal();
  }
}
