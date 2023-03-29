import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../interfaces/custom-response';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}

  public uploadImage(file: File, id: string): Observable<HttpEvent<any>> {
    const url = `${environment.apiUrl}/clientes/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.httpClient.request(req);
  }
}
