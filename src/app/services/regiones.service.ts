import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Region } from '../models/Region';

@Injectable({
  providedIn: 'root',
})
export class RegionesService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  public getRegiones(): Observable<Region[]> {
    const url = `${this.apiUrl}/clientes/regiones`;
    return this.httpClient.get<Region[]>(url);
  }
}
