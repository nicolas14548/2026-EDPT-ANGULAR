import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  displayedColumns: string[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12']
  dataSource: EjercicioDTO[] = []
  mensaje: string = ''

  constructor(private cS: Ejercicioservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtener()
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
