import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Loginservice } from '../../services/loginservice';

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

  constructor(private cS: Loginservice, private fb: FormBuilder, private router: Router, private cdr: ChangeDetectorRef) {
    this.cS.logout();
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
    this.cS.login({ username: this.form.value.username, password: this.form.value.password }).subscribe({
      next: () => {
        this.router.navigate(['/inicio'])
      },
      error: (error) => {
        console.log(error)
        this.mensaje = 'Correo o contraseña incorrectos'
        this.cdr.detectChanges()
      }
    })
  }
}
