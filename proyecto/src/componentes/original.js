// src/componentes/original.js
import { db } from '../firebase-config.js';
import { collection, addDoc } from 'firebase/firestore';
// ...existing code...

export const original = () => {
  const section = document.createElement('section');
  section.innerHTML = `
    <h2>Combinador de Nombres</h2>
    <input type="text" id="nombre1" placeholder="Primer nombre">
    <input type="text" id="nombre2" placeholder="Segundo nombre">
    <button id="generar">Generar combinación</button>
    <p id="resultado"></p>
  `;

  section.querySelector('#generar').addEventListener('click', async () => {
    const n1 = section.querySelector('#nombre1').value.trim();
    const n2 = section.querySelector('#nombre2').value.trim();
    const resultado = section.querySelector('#resultado');

    if (!n1 || !n2) {
      resultado.textContent = 'Por favor ingresa ambos nombres.';
      return;
    }

    try {
      const res = await fetch('https://randomuser.me/api/');
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const data = await res.json();
      const randomName = data.results[0].name.first;
      const nombreCombinado = `${n1}${n2} ${randomName}`;

      resultado.textContent = `Nombre combinado: ${nombreCombinado}`;

      // Guardar en Firestore
      await addDoc(collection(db, 'nombresCombinados'), {
        nombre1: n1,
        nombre2: n2,
        nombreCombinado,
        fecha: new Date()
      });
    } catch (error) {
      console.error('Error al llamar a la API o guardar en Firestore:', error);
      resultado.textContent = 'Hubo un problema al conectar con la API o guardar el nombre.';
    }
  });

  return section;
};