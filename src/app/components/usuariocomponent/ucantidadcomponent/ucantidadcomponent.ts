import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UsuariosPorRolDTO } from '../../../models/UsuariosPorRolDTO';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-ucantidadcomponent',
  imports: [MatTableModule],
  templateUrl: './ucantidadcomponent.html',
  styleUrl: './ucantidadcomponent.css',
})
export class Ucantidadcomponent implements OnInit {

  displayedColumns: string[] = ['C1', 'C2']
  dataSource: UsuariosPorRolDTO[] = []
  mensaje: string = ''

  constructor(private cS: Usuarioservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtener()
  }

  obtener(): void {
    this.cS.getCantidadesPorRol().subscribe({
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
