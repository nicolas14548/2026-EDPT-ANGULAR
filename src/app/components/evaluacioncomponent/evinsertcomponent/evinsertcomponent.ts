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
      idEstudiante: [null, Validators.required]
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
      this.mensaje = 'Por favor, seleccione un estudiante!!'
      return
    }
    // El estado inicial (EN_CURSO) lo asigna la API
    const evaluacion: EvaluacionDTO = {
      id: 0,
      idEstudiante: this.form.value.idEstudiante,
      estado: '',
      fechaInicio: null,
      fechaFin: null
    }

    this.cS.insertEvaluacion(evaluacion).subscribe({
      next: () => {
        this.mensaje = 'Evaluación insertada correctamente!!'
        this.form.reset()
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
