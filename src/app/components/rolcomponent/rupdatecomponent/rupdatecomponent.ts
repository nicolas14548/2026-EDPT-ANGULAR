import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Rolservice } from '../../../services/rolservice';
import { RolDTO } from '../../../models/RolDTO';

@Component({
  selector: 'app-rupdatecomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './rupdatecomponent.html',
  styleUrl: './rupdatecomponent.css',
})
export class Rupdatecomponent implements OnInit {
  id: number = 0
  form: FormGroup
  mensaje: string = ''

  constructor(
    private cS: Rolservice,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      codigo: [0],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Recuperar ID desde la URL
    this.id = Number(this.route.snapshot.paramMap.get('id'))

    if (!this.id || isNaN(this.id)) {
      this.mensaje = 'ID inválido'
      return
    }
    this.buscarPorId()
  }

  buscarPorId(): void {
    this.cS.listId(this.id).subscribe({
      next: (data: RolDTO) => {
        this.form.patchValue({
          codigo: data.id,
          nombre: data.nombre,
          descripcion: data.descripcion
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
    const dto: RolDTO = {
      id: this.form.value.codigo,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      fechaCreacion: null,
      actualizadoEn: null
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
