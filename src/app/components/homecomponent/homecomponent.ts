import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Menucomponent } from '../menucomponent/menucomponent';

@Component({
  selector: 'app-homecomponent',
  imports: [Menucomponent, RouterLink, MatButtonModule],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
})
export class Homecomponent {
  readonly correo = 'tu.correo@ejemplo.com';

  estudiantes = [
    {
      titulo: 'PRACTICA EJERCICIOS POR TEMA',
      texto: 'Elige el contenido que estás viendo en clase y resuelve actividades paso a paso.',
    },
    {
      titulo: 'REVISA TU PROGRESO',
      texto: 'Consulta tus avances e identifica los temas que necesitas reforzar.',
    },
  ];

  docentes = [
    {
      titulo: 'CREA TEMAS Y EJERCICIOS',
      texto: 'Prepara actividades alineadas con los contenidos de cada clase.',
    },
    {
      titulo: 'REVISA LAS EVALUACIONES DE TU AULA',
      texto: 'Observa los resultados del grupo y acompaña a cada estudiante.',
    },
  ];

  preguntas = [
    {
      pregunta: '¿QUIÉN PUEDE USAR EDUCACIÓN PARA TODOS?',
      respuesta: 'La plataforma está pensada para estudiantes y docentes que buscan reforzar el aprendizaje en el aula.',
    },
    {
      pregunta: '¿NECESITO INSTALAR ALGÚN PROGRAMA?',
      respuesta: 'No. Puedes acceder directamente desde un navegador con conexión a internet.',
    },
    {
      pregunta: '¿PUEDO REVISAR MI AVANCE?',
      respuesta: 'Sí. Los estudiantes pueden consultar su progreso y los docentes revisar los resultados de su aula.',
    },
  ];
}
