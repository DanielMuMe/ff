// src/componentes/login.js
import { auth, signInWithEmailAndPassword } from '../firebase-config.js';

export const login = () => {
  const section = document.createElement('section');
  section.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <input type="email" id="email" placeholder="Correo electrónico">
    <input type="password" id="password" placeholder="Contraseña">
    <button id="btn-login">Entrar</button>
    <p id="mensaje"></p>
  `;

  section.querySelector('#btn-login').addEventListener('click', () => {
    const email = section.querySelector('#email').value;
    const password = section.querySelector('#password').value;
    const mensaje = section.querySelector('#mensaje');

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        mensaje.textContent = 'Inicio de sesión exitoso.';
        setTimeout(() => window.location.hash = '#/perfil', 1000);
      })
      .catch((error) => {
        mensaje.textContent = 'Error al iniciar sesión: ' + error.message;
      });
  });

  return section;
};