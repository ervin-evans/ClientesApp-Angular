import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CustomResponse } from '../interfaces/custom-response';
import { ResponsePaginated } from '../interfaces/ResponsePaginated';
import { Cliente } from '../models/Cliente';
import { Region } from '../models/region';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  public getAllClients(): Observable<Cliente[]> {
    const url = `${this.apiUrl}/clientes/list`;
    return this.httpClient.get<Cliente[]>(url);
  }
  public getPaginatedClients(page: number): Observable<ResponsePaginated> {
    const url = `${this.apiUrl}/clientes/pageable?page=${page - 1}`;
    return this.httpClient.get<ResponsePaginated>(url);
  }

  public update(cliente: Cliente): Observable<CustomResponse> {
    const url = `${this.apiUrl}/clientes/update/${cliente.id}`;
    return this.httpClient.put<CustomResponse>(url, cliente);
  }
}
