import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-evaluacioncomponent',
  imports: [Menucomponent,RouterOutlet],
  templateUrl: './evaluacioncomponent.html',
  styleUrl: './evaluacioncomponent.css',
})
export class Evaluacioncomponent {}
