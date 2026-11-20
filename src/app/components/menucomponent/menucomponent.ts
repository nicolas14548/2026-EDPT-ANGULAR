import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-menucomponent',
  imports: [
    MatIconModule,
     MatButtonModule,
     MatToolbarModule,
     MatMenuModule,
     RouterLink],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  constructor(private authService: Authservice, private router: Router) { }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
