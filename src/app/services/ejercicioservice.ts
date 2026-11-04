import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EjercicioDTO } from '../models/EjercicioDTO';
import { EjercicioInsertDTO } from '../models/EjercicioInsertDTO';

@Injectable({
  providedIn: 'root',
})
export class Ejercicioservice {
  private apiURL = `${environment.base}/api/ejercicios`;

  constructor(private http: HttpClient) { }

  getEjercicio(): Observable<EjercicioDTO[]> {
    return this.http.get<EjercicioDTO[]>(this.apiURL);
  }

  deleteEjercicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  insertEjercicio(dto: EjercicioInsertDTO): Observable<EjercicioDTO> {
    return this.http.post<EjercicioDTO>(this.apiURL, dto);
  }

  listId(id: number): Observable<EjercicioDTO> {
    return this.http.get<EjercicioDTO>(`${this.apiURL}/${id}`);
  }

  update(id: number, dto: EjercicioInsertDTO): Observable<EjercicioDTO> {
    return this.http.put<EjercicioDTO>(`${this.apiURL}/${id}`, dto);
  }

}
