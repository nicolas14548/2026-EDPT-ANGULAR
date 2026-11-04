import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EvaluacionDTO } from '../../../models/EvaluacionDTO';
import { UsuarioDTO } from '../../../models/UsuarioDTO';
import { Evaluacionservice } from '../../../services/evaluacionservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evbuscarcomponent',
  imports: [
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './evbuscarcomponent.html',
  styleUrl: './evbuscarcomponent.css',
})
export class Evbuscarcomponent implements OnInit {

  dataSource: EvaluacionDTO[] = [];

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  estudiantes: UsuarioDTO[] = [];

  estudianteSeleccionado: number | null = null;

  mensaje: string = '';

  constructor(
    private cS: Evaluacionservice,
    private uS: Usuarioservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.uS.getUsuario().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al cargar estudiantes', error)
    });
  }

  buscarPorEstudiante(): void {

    if (!this.estudianteSeleccionado) {
      this.dataSource = [];
      this.mensaje = 'Seleccione un estudiante';
      return;
    }

    this.mensaje = 'Buscando...';
    this.dataSource = [];

    this.cS.getPorEstudiante(this.estudianteSeleccionado).subscribe({

      next: (data) => {

        this.dataSource = [...data];

        this.mensaje = data.length === 0
          ? 'No se encontraron registros!!'
          : '';

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error('Error al buscar!!', error);

        this.dataSource = [];
        this.mensaje = 'Error al realizar la búsqueda';

        this.cdr.detectChanges();

      }

    });
  }
}
