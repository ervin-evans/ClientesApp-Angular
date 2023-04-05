import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ResponsePaginated } from '../interfaces/ResponsePaginated';
import { Usuario } from '../models/Usuario';
import { CustomResponse } from '../interfaces/custom-response';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiBaseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  public getUsuariosPaginated(page: number): Observable<ResponsePaginated> {
    const url = `${this.apiBaseUrl}/users/paginated?page=${page - 1}`;
    return this.httpClient.get<ResponsePaginated>(url);
  }

  public save(usuario: Usuario): Observable<CustomResponse> {
    const url = `${this.apiBaseUrl}/users/save`;
    return this.httpClient.post<CustomResponse>(url, usuario);
  }
}
