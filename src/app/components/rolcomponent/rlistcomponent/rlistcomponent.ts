import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RolDTO } from '../../../models/RolDTO';
import { Rolservice } from '../../../services/rolservice';

@Component({
  selector: 'app-rlistcomponent',
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './rlistcomponent.html',
  styleUrl: './rlistcomponent.css',
})
export class Rlistcomponent implements OnInit {

  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4', 'C5']
  dataSource: RolDTO[] = []
  mensaje: string = ''

  constructor(private cS: Rolservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtener()
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
