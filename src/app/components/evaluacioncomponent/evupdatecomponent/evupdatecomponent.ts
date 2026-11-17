import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Evaluacionservice } from '../../../services/evaluacionservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { EvaluacionDTO } from '../../../models/EvaluacionDTO';
import { UsuarioDTO } from '../../../models/UsuarioDTO';

@Component({
  selector: 'app-evupdatecomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './evupdatecomponent.html',
  styleUrl: './evupdatecomponent.css',
})
export class Evupdatecomponent implements OnInit {
  id: number = 0

  usuarios: UsuarioDTO[] = []
  evaluacionOriginal: EvaluacionDTO | null = null
  form: FormGroup
  mensaje: string = ''

  constructor(
    private cS: Evaluacionservice,
    private uS: Usuarioservice,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      codigo: [0],
      idEstudiante: [null, Validators.required],
      estado: ['EN_CURSO', Validators.required]
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
      }, error: err => console.log(err)
    })
    this.buscarPorId()
  }

  buscarPorId(): void {
    this.cS.listId(this.id).subscribe({
      next: (data: EvaluacionDTO) => {
        this.evaluacionOriginal = data
        this.form.patchValue({
          codigo: data.id,
          idEstudiante: data.idEstudiante,
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
    if (!this.evaluacionOriginal) {
      this.mensaje = 'Primero debe cargar la evaluación'
      return
    }
    const dto: EvaluacionDTO = {
      id: this.form.value.codigo,
      idEstudiante: this.form.value.idEstudiante,
      estado: this.form.value.estado,
      tipo: this.evaluacionOriginal.tipo,
      totalEjercicios: this.evaluacionOriginal.totalEjercicios,
      fechaInicio: this.evaluacionOriginal.fechaInicio,
      fechaFin: this.evaluacionOriginal.fechaFin,
      puntaje: this.evaluacionOriginal.puntaje,
      respuestas: this.evaluacionOriginal.respuestas
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
