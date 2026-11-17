import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Rolservice } from '../../../services/rolservice';
import { UsuarioDTO } from '../../../models/UsuarioDTO';
import { UsuarioInsertDTO } from '../../../models/UsuarioInsertDTO';
import { RolDTO } from '../../../models/RolDTO';

@Component({
  selector: 'app-uupdatecomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './uupdatecomponent.html',
  styleUrl: './uupdatecomponent.css',
})
export class Uupdatecomponent implements OnInit {
  id: number = 0

  roles: RolDTO[] = []
  usuarios: UsuarioDTO[] = []
  form: FormGroup
  mensaje: string = ''

  constructor(
    private cS: Usuarioservice,
    private rS: Rolservice,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      codigo: [0],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      idRol: [null, Validators.required],
      idApoderado: [null],
      idDocente: [null],
      grado: [null],
      seccion: [null],
      estado: ['']
    });
  }

  ngOnInit(): void {
    // Recuperar ID desde la URL
    this.id = Number(this.route.snapshot.paramMap.get('id'))

    if (!this.id || isNaN(this.id)) {
      this.mensaje = 'ID inválido'
      return
    }
    this.rS.getRol().subscribe({
      next: data => {
        this.roles = data
        this.cdr.detectChanges()
      }, error: err => console.log(err)
    })
    this.cS.getUsuario().subscribe({
      next: data => {
        this.usuarios = data.filter(u => u.id !== this.id)
        this.cdr.detectChanges()
      }, error: err => console.log(err)
    })
    this.buscarPorId()
  }

  buscarPorId(): void {
    this.cS.listId(this.id).subscribe({
      next: (data: UsuarioDTO) => {
        this.form.patchValue({
          codigo: data.id,
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          idRol: data.idRol,
          idApoderado: data.idApoderado,
          idDocente: data.idDocente,
          grado: data.grado,
          seccion: data.seccion,
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
      this.mensaje = 'Por favor, complete todos los campos correctamente (la API exige la contraseña)!!'
      return
    }
    const dto: UsuarioInsertDTO = {
      id: this.form.value.codigo,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      password: this.form.value.password,
      idRol: this.form.value.idRol,
      idApoderado: this.form.value.idApoderado,
      idDocente: this.form.value.idDocente,
      grado: this.form.value.grado,
      seccion: this.form.value.seccion,
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
