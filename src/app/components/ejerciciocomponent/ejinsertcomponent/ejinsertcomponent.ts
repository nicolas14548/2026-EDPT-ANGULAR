import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-ejinsertcomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule],
  templateUrl: './ejinsertcomponent.html',
  styleUrl: './ejinsertcomponent.css',
})
export class Ejinsertcomponent implements OnInit {

  usuarios: UsuarioDTO[] = []
  form: FormGroup
  mensaje: string = ''

  constructor(
    private cS: Ejercicioservice,
    private uS: Usuarioservice,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      materia: ['', Validators.required],
      tema: ['', Validators.required],
      enunciado: ['', Validators.required],
      respuestaCorrecta: ['', Validators.required],
      idCreadoPor: [null, Validators.required],
      contenidoJson: [''],
      nivelDificultad: [1],
      estado: ['ACTIVO'],
      generadoPorIa: [false]
    });
  }

  ngOnInit(): void {
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
  }

  insertar(): void {
    if (this.form.invalid) {
      this.mensaje = 'Por favor, complete todos los campos correctamente!!'
      return
    }
    const dto: EjercicioInsertDTO = {
      id: 0,
      materia: this.form.value.materia,
      tema: this.form.value.tema,
      enunciado: this.form.value.enunciado,
      contenidoJson: this.form.value.contenidoJson || null,      
      respuestaCorrecta: this.form.value.respuestaCorrecta,
      nivelDificultad: this.form.value.nivelDificultad,
      generadoPorIa: this.form.value.generadoPorIa,
      idCreadoPor: this.form.value.idCreadoPor,
      estado: this.form.value.estado
    }

    this.cS.insertEjercicio(dto).subscribe({
      next: () => {
        this.mensaje = 'Ejercicio insertado correctamente!!'
        this.form.reset({ nivelDificultad: 1, estado: 'ACTIVO', generadoPorIa: false })
        this.cdr.detectChanges()
      },
      error: (error) => {
        this.mensaje = error?.error?.message ?? 'Error al insertar el ejercicio!!'
        console.log(error)
        this.cdr.detectChanges()
      }
    })
  }
}
