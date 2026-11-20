import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Loginservice } from '../../../services/loginservice';
import { UsuarioDTO } from '../../../models/UsuarioDTO';
import { Usuarioservice } from '../../../services/usuarioservice';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RolDTO } from '../../../models/RolDTO';
import { Rolservice } from '../../../services/rolservice';

@Component({
  selector: 'app-rlistcomponent',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, DatePipe],
  templateUrl: './rlistcomponent.html',
  styleUrl: './rlistcomponent.css',
})
export class Rlistcomponent implements OnInit {

  esAdmin = inject(Loginservice).hasAnyRole(['ADMIN'])
  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C6', 'C7', 'C8', 'C9', 'C4', 'C5']  
  dataSource: RolDTO[] = []
  mensaje: string = ''

  constructor(private cS: Rolservice,
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
    this.cS.getRol().subscribe({
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
    this.cS.deleteRol(id).subscribe({
      next: () => {
        this.mensaje = 'Rol eliminado correctamente'
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
