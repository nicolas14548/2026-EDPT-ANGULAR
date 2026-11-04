import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UsuarioDTO } from '../../../models/UsuarioDTO';
import { Usuarioservice } from '../../../services/usuarioservice';
import { RolDTO } from '../../../models/RolDTO';
import { Rolservice } from '../../../services/rolservice';

@Component({
  selector: 'app-ulistcomponent',
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './ulistcomponent.html',
  styleUrl: './ulistcomponent.css',
})
export class Ulistcomponent implements OnInit {

  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8']
  dataSource: UsuarioDTO[] = []
  mensaje: string = ''
  roles: RolDTO[] = []

  constructor(private cS: Usuarioservice,
    private cdr: ChangeDetectorRef,
    private rS: Rolservice
  ) { }

  ngOnInit(): void {
    this.rS.getRol().subscribe({
      next: data => {
        this.roles = data
        this.cdr.detectChanges()
      }, error: err => console.log(err)
    })
    this.obtener()
  }

  obtener(): void {
    this.cS.getUsuario().subscribe({
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

  nombreRol(idRol: number): string {
    return this.roles.find(r => r.id === idRol)?.nombre ?? String(idRol)
  }

  eliminar(id: number): void {
    this.cS.deleteUsuario(id).subscribe({
      next: () => {
        this.mensaje = 'Usuario desactivado correctamente'
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
