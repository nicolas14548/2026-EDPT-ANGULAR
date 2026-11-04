import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Rolservice } from '../../../services/rolservice';
import { RolInsertDTO } from '../../../models/RolInsertDTO';

@Component({
  selector: 'app-rinsertcomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './rinsertcomponent.html',
  styleUrl: './rinsertcomponent.css',
})
export class Rinsertcomponent {

  form: FormGroup
  mensaje: string = ''

  constructor(private cS: Rolservice, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  insertar(): void {
    if (this.form.invalid) {
      this.mensaje = 'Por favor, complete todos los campos correctamente!!'
      return
    }
    const rol: RolInsertDTO = {
      id: 0,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion
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
