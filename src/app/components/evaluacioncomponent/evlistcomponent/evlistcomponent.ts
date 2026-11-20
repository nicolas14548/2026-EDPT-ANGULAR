import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EvaluacionDTO } from '../../../models/EvaluacionDTO';
import { Evaluacionservice } from '../../../services/evaluacionservice';
import { UsuarioDTO } from '../../../models/UsuarioDTO';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-evlistcomponent',
  imports: [MatTableModule, MatIconModule, RouterLink, DatePipe],
  templateUrl: './evlistcomponent.html',
  styleUrl: './evlistcomponent.css',
})
export class Evlistcomponent implements OnInit {

  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9']
  dataSource: EvaluacionDTO[] = []
  mensaje: string = ''
  usuarios: UsuarioDTO[] = []

  constructor(private cS: Evaluacionservice,
    private cdr: ChangeDetectorRef,
    private uS: Usuarioservice
  ) { }

  ngOnInit(): void {
    this.uS.getUsuario().subscribe({
      next: data => {
        this.usuarios = data
        this.cdr.detectChanges()
      }, error: err => console.log(err)
    })
    this.obtener()
  }

  obtener(): void {
    this.cS.getEvaluacion().subscribe({
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

  nombreEstudiante(idEstudiante: number): string {
    const u = this.usuarios.find(x => x.id === idEstudiante)
    return u ? `${u.nombre} ${u.apellido}` : String(idEstudiante)
  }

  eliminar(id: number): void {
    this.cS.deleteEvaluacion(id).subscribe({
      next: () => {
        this.mensaje = 'Evaluación eliminada correctamente'
        this.obtener()
        this.cdr.detectChanges()
      }, error: err => {
        console.log(err)
        this.mensaje = err?.error?.message ?? 'Error al eliminar'
        this.cdr.detectChanges()
      }
    })
  }
}
