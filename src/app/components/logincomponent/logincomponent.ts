import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-logincomponent',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent {

  form: FormGroup
  mensaje: string = ''

  constructor(private cS: Authservice, private fb: FormBuilder, private router: Router, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ingresar(): void {
    if (this.form.invalid) {
      this.mensaje = 'Por favor, ingrese un correo y una contraseña válidos'
      return
    }
    this.cS.login(this.form.value.username, this.form.value.password).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.log(error)
        this.mensaje = 'Correo o contraseña incorrectos'
        this.cdr.detectChanges()
      }
    })
  }
}
