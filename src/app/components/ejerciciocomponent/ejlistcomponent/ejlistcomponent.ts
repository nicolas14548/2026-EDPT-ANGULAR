import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Loginservice } from '../../../services/loginservice';
import { UsuarioDTO } from '../../../models/UsuarioDTO';
import { Usuarioservice } from '../../../services/usuarioservice';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { EjercicioDTO } from '../../../models/EjercicioDTO';
import { Ejercicioservice } from '../../../services/ejercicioservice';

@Component({
  selector: 'app-ejlistcomponent',
  imports: [MatTableModule, MatIconModule, RouterLink, DatePipe],
  templateUrl: './ejlistcomponent.html',
  styleUrl: './ejlistcomponent.css',
})
export class Ejlistcomponent implements OnInit {

  esAdmin = inject(Loginservice).hasAnyRole(['ADMIN'])

  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C9', 'C10', 'C11', 'C12', 'C7', 'C8']
  dataSource: EjercicioDTO[] = []
  mensaje: string = ''

  constructor(private cS: Ejercicioservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios()
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
    this.cS.getEjercicio().subscribe({
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

  eliminar(id: number): void {
    this.cS.deleteEjercicio(id).subscribe({
      next: () => {
        this.mensaje = 'Ejercicio eliminado correctamente'
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
