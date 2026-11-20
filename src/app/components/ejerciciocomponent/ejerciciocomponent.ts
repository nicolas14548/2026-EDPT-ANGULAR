import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ejerciciocomponent',
  imports: [Menucomponent,RouterOutlet],
  templateUrl: './ejerciciocomponent.html',
  styleUrl: './ejerciciocomponent.css',
})
export class Ejerciciocomponent {}
