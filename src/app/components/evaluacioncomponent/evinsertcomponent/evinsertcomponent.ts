import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Evaluacionservice } from '../../../services/evaluacionservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { EvaluacionDTO } from '../../../models/EvaluacionDTO';
import { UsuarioDTO } from '../../../models/UsuarioDTO';

@Component({
  selector: 'app-evinsertcomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './evinsertcomponent.html',
  styleUrl: './evinsertcomponent.css',
})
export class Evinsertcomponent implements OnInit {

  usuarios: UsuarioDTO[] = []
  form: FormGroup
  mensaje: string = ''

  constructor(
    private cS: Evaluacionservice,
    private uS: Usuarioservice,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      idEstudiante: [null, Validators.required],
      tipo: ['', Validators.required],
      estado: ['EN_CURSO', Validators.required],
      totalEjercicios: [null, Validators.required],
      fechaInicio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.uS.getUsuario().subscribe({
      next: data => {
        this.usuarios = data
        this.cdr.detectChanges()
      }, error: err => console.log(err)
    })
  }

  insertar(): void {
    if (this.form.invalid) {
      this.mensaje = 'Por favor, complete todos los campos correctamente!!'
      return
    }
    const evaluacion: EvaluacionDTO = {
      id: 0,
      idEstudiante: this.form.value.idEstudiante,
      tipo: this.form.value.tipo,
      estado: this.form.value.estado,
      totalEjercicios: this.form.value.totalEjercicios,
      fechaInicio: this.form.value.fechaInicio,
      fechaFin: null,
      puntaje: null,
      respuestas: null
    }

    this.cS.insertEvaluacion(evaluacion).subscribe({
      next: () => {
        this.mensaje = 'Evaluación insertada correctamente!!'
        this.form.reset({ estado: 'EN_CURSO' })
        this.cdr.detectChanges()
      },
      error: (error) => {
        this.mensaje = error?.error?.message ?? 'Error al insertar la evaluación!!'
        console.log(error)
        this.cdr.detectChanges()
      }
    })
  }
}
