import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Rolservice } from '../../../services/rolservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { RolDTO } from '../../../models/RolDTO';
import { RolInsertDTO } from '../../../models/RolInsertDTO';
import { UsuarioDTO } from '../../../models/UsuarioDTO';

@Component({
  selector: 'app-rupdatecomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './rupdatecomponent.html',
  styleUrl: './rupdatecomponent.css',
})
export class Rupdatecomponent implements OnInit {
  id: number = 0
  usuarios: UsuarioDTO[] = []
  form: FormGroup
  mensaje: string = ''

  constructor(
    private cS: Rolservice,
    private uS: Usuarioservice,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      codigo: [0],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      idCreadoPor: [null],
      idActualizadoPor: [null]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))

    if (!this.id || isNaN(this.id)) {
      this.mensaje = 'ID inválido'
      return
    }
    this.uS.getUsuario().subscribe({
      next: data => {
        this.usuarios = data
        this.cdr.detectChanges()
      }, error: err => console.log(err)
    })
    this.buscarPorId()
  }

  buscarPorId(): void {
    this.cS.listId(this.id).subscribe({
      next: (data: RolDTO) => {
        this.form.patchValue({
          codigo: data.id,
          nombre: data.nombreRol,
          descripcion: data.descripcionRol,
          idCreadoPor: data.idCreadoPor,
          idActualizadoPor: data.idActualizadoPor
        })
        this.cdr.detectChanges()
      },
      error: (error) => {
        console.error('Error al buscar !!!', error)
        this.mensaje = 'No se encontró !!!'
        this.cdr.detectChanges()
      }
    })
  }

  actualizar(): void {
    if (this.form.invalid) {
      this.mensaje = 'Por favor, complete todos los campos correctamente!!'
      return
    }
    const dto: RolInsertDTO = {
      id: this.form.value.codigo,
      nombreRol: this.form.value.nombre,
      descripcionRol: this.form.value.descripcion,
      idCreadoPor: this.form.value.idCreadoPor,
      idActualizadoPor: this.form.value.idActualizadoPor
    }

    this.cS.update(dto).subscribe({
      next: () => {
        this.mensaje = 'Actualizado correctamente!!'
        this.cdr.detectChanges()
      },
      error: (error) => {
        console.error(error)
        this.mensaje = error?.error?.message ?? 'Error al actualizar!!'
        this.cdr.detectChanges()
      }
    })
  }
}
