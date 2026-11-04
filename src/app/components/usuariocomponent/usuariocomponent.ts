import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuariocomponent',
  imports: [Menucomponent,RouterOutlet],
  templateUrl: './usuariocomponent.html',
  styleUrl: './usuariocomponent.css',
})
export class Usuariocomponent {}
