// src/router.js
import { home } from './componentes/home.js';
import { login } from './componentes/login.js';
import { registro } from './componentes/registro.js';
import { perfil } from './componentes/perfil.js';
import { original } from './componentes/original.js';
import { logout } from './componentes/logout.js';

export const router = () => {
  const main = document.getElementById('root');
  main.innerHTML = '';

  switch (window.location.hash) {
    case '#/':
    case '':
      main.appendChild(home());
      break;
    case '#/login':
      main.appendChild(login());
      break;
    case '#/registro':
      main.appendChild(registro());
      break;
    case '#/perfil':
      main.appendChild(perfil());
      break;
    case '#/original':
      main.appendChild(original());
      break;
    case '#/logout':
      main.appendChild(logout());
      break;
    default:
      main.innerHTML = '<h1>404 - Página no encontrada</h1>';
  }
};

// Escuchar cambios en la URL
window.addEventListener('hashchange', router);
window.addEventListener('load', router);