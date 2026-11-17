import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EvaluacionesPorEstudianteDTO } from '../../../models/EvaluacionesPorEstudianteDTO';
import { Evaluacionservice } from '../../../services/evaluacionservice';

@Component({
  selector: 'app-evcantidadcomponent',
  imports: [MatTableModule],
  templateUrl: './evcantidadcomponent.html',
  styleUrl: './evcantidadcomponent.css',
})
export class Evcantidadcomponent implements OnInit {

  displayedColumns: string[] = ['C1', 'C2']
  dataSource: EvaluacionesPorEstudianteDTO[] = []
  mensaje: string = ''

  constructor(private cS: Evaluacionservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtener()
  }

  obtener(): void {
    this.cS.getCantidadesPorEstudiante().subscribe({
      next: data => {
        this.dataSource = data
        this.cdr.detectChanges()
      }, error: err => {
        console.log(err)
        this.mensaje = err?.error?.message ?? 'Error al cargar los datos'
        this.cdr.detectChanges()
      }
    })
  }
}
