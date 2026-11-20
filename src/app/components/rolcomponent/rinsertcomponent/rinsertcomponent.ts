import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Rolservice } from '../../../services/rolservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { RolInsertDTO } from '../../../models/RolInsertDTO';
import { UsuarioDTO } from '../../../models/UsuarioDTO';

@Component({
  selector: 'app-rinsertcomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './rinsertcomponent.html',
  styleUrl: './rinsertcomponent.css',
})
export class Rinsertcomponent implements OnInit {

  usuarios: UsuarioDTO[] = []
  form: FormGroup
  mensaje: string = ''

  constructor(private cS: Rolservice, private uS: Usuarioservice, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      idCreadoPor: [null, Validators.required]
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
    const rol: RolInsertDTO = {
      id: 0,
      nombreRol: this.form.value.nombre,
      descripcionRol: this.form.value.descripcion,
      idCreadoPor: this.form.value.idCreadoPor,
      idActualizadoPor: null
    }

    this.cS.insertRol(rol).subscribe({
      next: () => {
        this.mensaje = 'Rol insertado correctamente!!'
        this.form.reset()
        this.cdr.detectChanges()
      },
      error: (error) => {
        this.mensaje = error?.error?.message ?? 'Error al insertar el rol!!'
        console.log(error)
        this.cdr.detectChanges()
      }
    })
  }
}
