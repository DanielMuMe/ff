// src/componentes/home.js
export const home = () => {
  const section = document.createElement('section');
  section.innerHTML = `
    <h2>Bienvenido</h2>
    <p>Este es un proyecto que usa Firebase y RandomAPI para generar contenido dinámico.</p>
    <ul>
      <li><a href="#/login">Iniciar Sesión</a></li>
      <li><a href="#/registro">Registrarse</a></li>
      <li><a href="#/original">Combinador de Nombres</a></li>
    </ul>
  `;
  return section;
};