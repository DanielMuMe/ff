// src/componentes/registro.js
import { auth, createUserWithEmailAndPassword } from '../firebase-config.js';

export const registro = () => {
  const section = document.createElement('section');
  section.innerHTML = `
    <h2>Registrarse</h2>
    <input type="email" id="email" placeholder="Correo electrónico">
    <input type="password" id="password" placeholder="Contraseña">
    <button id="btn-registro">Registrar</button>
    <p id="mensaje"></p>
  `;

  section.querySelector('#btn-registro').addEventListener('click', () => {
    const email = section.querySelector('#email').value;
    const password = section.querySelector('#password').value;
    const mensaje = section.querySelector('#mensaje');

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        mensaje.textContent = 'Registro exitoso.';
        setTimeout(() => window.location.hash = '#/login', 1000);
      })
      .catch((error) => {
        mensaje.textContent = 'Error al registrar: ' + error.message;
      });
  });

  return section;
};