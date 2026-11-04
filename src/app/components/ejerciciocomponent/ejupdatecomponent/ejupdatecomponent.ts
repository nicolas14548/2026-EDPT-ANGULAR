import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Ejercicioservice } from '../../../services/ejercicioservice';
import { EjercicioDTO } from '../../../models/EjercicioDTO';
import { EjercicioInsertDTO } from '../../../models/EjercicioInsertDTO';

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

  form: FormGroup
  mensaje: string = ''

  constructor(
    private cS: Ejercicioservice,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      codigo: [0],
      tema: ['', Validators.required],
      enunciado: ['', Validators.required],
      respuestaCorrecta: ['', Validators.required],
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
    this.buscarPorId()
  }

  buscarPorId(): void {
    this.cS.listId(this.id).subscribe({
      next: (data: EjercicioDTO) => {
        // La API no devuelve la respuesta correcta: hay que volver a escribirla
        this.form.patchValue({
          codigo: data.id,
          tema: data.tema,
          enunciado: data.enunciado,
          contenidoJson: data.contenidoJson,
          nivelDificultad: data.nivelDificultad,
          generadoPorIa: data.generadoPorIa,
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
      this.mensaje = 'Por favor, complete todos los campos (escriba de nuevo la respuesta correcta)!!'
      return
    }
    const dto: EjercicioInsertDTO = {
      tema: this.form.value.tema,
      enunciado: this.form.value.enunciado,
      contenidoJson: this.form.value.contenidoJson,
      respuestaCorrecta: this.form.value.respuestaCorrecta,
      nivelDificultad: this.form.value.nivelDificultad,
      generadoPorIa: this.form.value.generadoPorIa,
      estado: this.form.value.estado
    }

    this.cS.update(this.form.value.codigo, dto).subscribe({
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
