import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Ejercicioservice } from '../../../services/ejercicioservice';
import { EjercicioInsertDTO } from '../../../models/EjercicioInsertDTO';
import { Usuarioservice } from '../../../services/usuarioservice';
import { UsuarioDTO } from '../../../models/UsuarioDTO';

@Component({
  selector: 'app-ejupdatecomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule],
  templateUrl: './ejupdatecomponent.html',
  styleUrl: './ejupdatecomponent.css',
})
export class Ejupdatecomponent implements OnInit {
  id: number = 0

  usuarios: UsuarioDTO[] = []
  form: FormGroup
  mensaje: string = ''

  constructor(
    private cS: Ejercicioservice,
    private uS: Usuarioservice,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      codigo: [0],
      materia: ['', Validators.required],
      tema: ['', Validators.required],
      enunciado: ['', Validators.required],
      respuestaCorrecta: ['', Validators.required],
      idCreadoPor: [null],
      idActualizadoPor: [null],
      contenidoJson: [''],
      nivelDificultad: [1],
      estado: ['ACTIVO'],
      generadoPorIa: [false]
    });
  }

  ngOnInit(): void {
    // Recuperar ID desde la URL
    this.id = Number(this.route.snapshot.paramMap.get('id'))

    if (!this.id || isNaN(this.id)) {
      this.mensaje = 'ID inválido'
      return
    }
    this.uS.getUsuario().subscribe({
      next: data => {
        this.usuarios = data
        this.cdr.detectChanges()
      },
      error: error => {
        console.error(error)
        this.mensaje = error?.error?.message ?? 'Error al cargar los usuarios'
        this.cdr.detectChanges()
      }
    })
    this.buscarPorId()
  }

  buscarPorId(): void {
    this.cS.listId(this.id).subscribe({
      next: (data: EjercicioInsertDTO) => {
        this.form.patchValue({
          codigo: data.id,
          materia: data.materia,
          tema: data.tema,
          enunciado: data.enunciado,
          respuestaCorrecta: data.respuestaCorrecta,
          contenidoJson: data.contenidoJson,
          nivelDificultad: data.nivelDificultad,
          generadoPorIa: data.generadoPorIa,
          idCreadoPor: data.idCreadoPor,
          idActualizadoPor: data.idActualizadoPor,
          estado: data.estado
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
    const dto: EjercicioInsertDTO = {
      id: this.form.value.codigo,
      materia: this.form.value.materia,
      tema: this.form.value.tema,
      enunciado: this.form.value.enunciado,
      contenidoJson: this.form.value.contenidoJson,
      respuestaCorrecta: this.form.value.respuestaCorrecta,
      nivelDificultad: this.form.value.nivelDificultad,
      generadoPorIa: this.form.value.generadoPorIa,
      idCreadoPor: this.form.value.idCreadoPor,
      idActualizadoPor: this.form.value.idActualizadoPor,
      estado: this.form.value.estado
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
