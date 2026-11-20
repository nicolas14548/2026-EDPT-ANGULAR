import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Rolcomponent } from './components/rolcomponent/rolcomponent';
import { Rlistcomponent } from './components/rolcomponent/rlistcomponent/rlistcomponent';
import { Rinsertcomponent } from './components/rolcomponent/rinsertcomponent/rinsertcomponent';
import { Rupdatecomponent } from './components/rolcomponent/rupdatecomponent/rupdatecomponent';
import { Usuariocomponent } from './components/usuariocomponent/usuariocomponent';
import { Ulistcomponent } from './components/usuariocomponent/ulistcomponent/ulistcomponent';
import { Uinsertcomponent } from './components/usuariocomponent/uinsertcomponent/uinsertcomponent';
import { Uupdatecomponent } from './components/usuariocomponent/uupdatecomponent/uupdatecomponent';
import { Ejerciciocomponent } from './components/ejerciciocomponent/ejerciciocomponent';
import { Ejlistcomponent } from './components/ejerciciocomponent/ejlistcomponent/ejlistcomponent';
import { Ejinsertcomponent } from './components/ejerciciocomponent/ejinsertcomponent/ejinsertcomponent';
import { Ejupdatecomponent } from './components/ejerciciocomponent/ejupdatecomponent/ejupdatecomponent';
import { Evaluacioncomponent } from './components/evaluacioncomponent/evaluacioncomponent';
import { Evlistcomponent } from './components/evaluacioncomponent/evlistcomponent/evlistcomponent';
import { Evinsertcomponent } from './components/evaluacioncomponent/evinsertcomponent/evinsertcomponent';
import { Evupdatecomponent } from './components/evaluacioncomponent/evupdatecomponent/evupdatecomponent';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { authGuard } from './guards/auth.guard';
import { Evbuscarcomponent } from './components/evaluacioncomponent/evbuscarcomponent/evbuscarcomponent';

import { Ucantidadcomponent } from './components/usuariocomponent/ucantidadcomponent/ucantidadcomponent';
import { Evcantidadcomponent } from './components/evaluacioncomponent/evcantidadcomponent/evcantidadcomponent';

export const routes: Routes = [
  {
    path: 'login',
    component: Logincomponent,
  },

  {
    path: '',
    component: Homecomponent,
    canActivate: [authGuard],
  },

  {
    path: 'rol',
    canActivate: [authGuard],
    component: Rolcomponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      }, {
        path: 'editar/:id',
        component: Rupdatecomponent,
      },
      {
        path: 'listar',
        component: Rlistcomponent,
      },
      {
        path: 'insertar',
        component: Rinsertcomponent,
      },
    ],
  },

  {
    path: 'usuario',
    canActivate: [authGuard],
    component: Usuariocomponent,
    children: [
      {
        path: 'cantidades',
        component: Ucantidadcomponent,
      },
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      }, {
        path: 'editar/:id',
        component: Uupdatecomponent,
      },
      {
        path: 'listar',
        component: Ulistcomponent,
      },
      {
        path: 'insertar',
        component: Uinsertcomponent,
      },
    ],
  },

  {
    path: 'ejercicio',
    canActivate: [authGuard],
    component: Ejerciciocomponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      }, {
        path: 'editar/:id',
        component: Ejupdatecomponent,
      },
      {
        path: 'listar',
        component: Ejlistcomponent,
      },
      {
        path: 'insertar',
        component: Ejinsertcomponent,
      },
    ],
  },

  {
    path: 'evaluacion',
    canActivate: [authGuard],
    component: Evaluacioncomponent,
    children: [
      {
        path: 'cantidades',
        component: Evcantidadcomponent,
      },
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
      }, {
        path: 'editar/:id',
        component: Evupdatecomponent,
      },
      {
        path: 'buscar',
        component: Evbuscarcomponent
      },
      {
        path: 'listar',
        component: Evlistcomponent,
      },
      {
        path: 'insertar',
        component: Evinsertcomponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
