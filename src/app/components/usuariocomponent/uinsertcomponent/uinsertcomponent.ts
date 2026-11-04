import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Rolservice } from '../../../services/rolservice';
import { UsuarioDTO } from '../../../models/UsuarioDTO';
import { RolDTO } from '../../../models/RolDTO';

@Component({
  selector: 'app-uinsertcomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './uinsertcomponent.html',
  styleUrl: './uinsertcomponent.css',
})
export class Uinsertcomponent implements OnInit {

  roles: RolDTO[] = []
  usuarios: UsuarioDTO[] = []
  form: FormGroup
  mensaje: string = ''

  constructor(
    private cS: Usuarioservice,
    private rS: Rolservice,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      idRol: [null, Validators.required],
      idApoderado: [null]
    });
  }

  ngOnInit(): void {
    this.rS.getRol().subscribe({
      next: data => {
        this.roles = data
        this.cdr.detectChanges()
      }, error: err => console.log(err)
    })
    this.cS.getUsuario().subscribe({
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
    const usuario: UsuarioDTO = {
      id: 0,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      password: this.form.value.password,
      idRol: this.form.value.idRol,
      idApoderado: this.form.value.idApoderado,
      estado: ''
    }

    this.cS.insertUsuario(usuario).subscribe({
      next: () => {
        this.mensaje = 'Usuario insertado correctamente!!'
        this.form.reset()
        this.cdr.detectChanges()
      },
      error: (error) => {
        this.mensaje = error?.error?.message ?? 'Error al insertar el usuario!!'
        console.log(error)
        this.cdr.detectChanges()
      }
    })
  }
}
