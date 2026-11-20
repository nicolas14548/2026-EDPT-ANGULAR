import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Loginservice } from '../../../services/loginservice';
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

  esAdmin = inject(Loginservice).hasAnyRole(['ADMIN'])

  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C8', 'C9', 'C6', 'C7']
  dataSource: EvaluacionDTO[] = []
  mensaje: string = ''
  usuarios: UsuarioDTO[] = []

  constructor(private cS: Evaluacionservice,
    private cdr: ChangeDetectorRef,
    private uS: Usuarioservice
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios()
    this.uS.getUsuario().subscribe({
      next: data => {
        this.usuarios = data
        this.cdr.detectChanges()
      }, error: err => console.log(err)
    })
    this.obtener()
  }

  listaUsuarios: UsuarioDTO[] = []
  servicioUsuarios = inject(Usuarioservice)

  cargarUsuarios(): void {
    this.servicioUsuarios.getUsuario().subscribe({
      next: data => {
        this.listaUsuarios = data
        this.cdr.detectChanges()
      }, error: err => console.log(err)
    })
  }

  nombreUsuario(id: number | null): string {
    if (id == null) {
      return '-'
    }
    const usuario = this.listaUsuarios.find(u => u.id === id)
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : String(id)
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
