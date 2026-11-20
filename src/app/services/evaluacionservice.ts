import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvaluacionDTO } from '../models/EvaluacionDTO';
import { EvaluacionInsertDTO } from '../models/EvaluacionInsertDTO';
import { EvaluacionesPorEstudianteDTO } from '../models/EvaluacionesPorEstudianteDTO';

@Injectable({
  providedIn: 'root',
})
export class Evaluacionservice {
  private apiURL = `${environment.base}/api/evaluaciones`;

  constructor(private http: HttpClient) { }

  getEvaluacion(): Observable<EvaluacionDTO[]> {
    return this.http.get<EvaluacionDTO[]>(this.apiURL);
  }

  deleteEvaluacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  insertEvaluacion(dto: EvaluacionInsertDTO): Observable<EvaluacionDTO> {
    return this.http.post<EvaluacionDTO>(this.apiURL, dto);
  }

  listId(id: number): Observable<EvaluacionDTO> {
    return this.http.get<EvaluacionDTO>(`${this.apiURL}/${id}`);
  }

  update(dto: EvaluacionInsertDTO): Observable<EvaluacionDTO> {
    return this.http.put<EvaluacionDTO>(this.apiURL, dto);
  }


  getPorEstudiante(idEstudiante: number): Observable<EvaluacionDTO[]> {
    return this.http.get<EvaluacionDTO[]>(`${this.apiURL}/estudiante/${idEstudiante}`);
  }
  getCantidadesPorEstudiante(): Observable<EvaluacionesPorEstudianteDTO[]> {
    return this.http.get<EvaluacionesPorEstudianteDTO[]>(`${this.apiURL}/cantidades`);
  }
}
