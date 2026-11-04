import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolDTO } from '../models/RolDTO';
import { RolInsertDTO } from '../models/RolInsertDTO';

@Injectable({
  providedIn: 'root',
})
export class Rolservice {
  private apiURL = `${environment.base}/api/roles`;

  constructor(private http: HttpClient) { }

  getRol(): Observable<RolDTO[]> {
    return this.http.get<RolDTO[]>(this.apiURL);
  }

  deleteRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  insertRol(dto: RolInsertDTO): Observable<RolDTO> {
    return this.http.post<RolDTO>(this.apiURL, dto);
  }

  listId(id: number): Observable<RolDTO> {
    return this.http.get<RolDTO>(`${this.apiURL}/${id}`);
  }

  update(dto: RolDTO): Observable<RolDTO> {
    return this.http.put<RolDTO>(this.apiURL, dto);
  }

}
