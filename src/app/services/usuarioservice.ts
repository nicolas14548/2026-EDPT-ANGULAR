import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../models/UsuarioDTO';
import { UsuarioInsertDTO } from '../models/UsuarioInsertDTO';

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private apiURL = `${environment.base}/api/usuarios`;

  constructor(private http: HttpClient) { }

  getUsuario(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.apiURL);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  insertUsuario(dto: UsuarioInsertDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.apiURL, dto);
  }

  listId(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.apiURL}/${id}`);
  }

  update(dto: UsuarioInsertDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(this.apiURL, dto);
  }

}
