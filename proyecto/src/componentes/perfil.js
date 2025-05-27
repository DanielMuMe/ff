// src/componentes/perfil.js
import { auth, db } from '../firebase-config.js';
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

export const perfil = () => {
  const section = document.createElement('section');
  const user = auth.currentUser;

  if (user) {
    // Función para cargar los datos actuales del usuario
    const cargarDatos = async () => {
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      let datos = { nombre: '', telefono: '', nacimiento: '' };
      if (docSnap.exists()) {
        datos = docSnap.data();
      }
      section.innerHTML = `
        <h2>Tu Perfil</h2>
        <p>Email: ${user.email}</p>
        <form id="form-perfil">
          <label>Nombre: <input type="text" id="nombre" value="${datos.nombre || ''}" /></label><br>
          <label>Teléfono: <input type="text" id="telefono" value="${datos.telefono || ''}" /></label><br>
          <label>Fecha de nacimiento: <input type="date" id="nacimiento" value="${datos.nacimiento || ''}" /></label><br>
          <button type="submit">Guardar cambios</button>
        </form>
        <button id="btn-logout">Cerrar Sesión</button>
        <p id="mensaje"></p>
      `;

      section.querySelector('#btn-logout').addEventListener('click', () => {
        window.location.hash = '#/logout';
      });

      section.querySelector('#form-perfil').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = section.querySelector('#nombre').value;
        const telefono = section.querySelector('#telefono').value;
        const nacimiento = section.querySelector('#nacimiento').value;
        try {
          await setDoc(doc(db, "usuarios", user.uid), {
            nombre,
            telefono,
            nacimiento,
            email: user.email
          });
          section.querySelector('#mensaje').textContent = "Datos actualizados correctamente.";
        } catch (error) {
          section.querySelector('#mensaje').textContent = "Error al actualizar los datos.";
        }
      });
    };

    cargarDatos();
  } else {
    section.innerHTML = `<p>No hay usuario autenticado.</p>`;
  }

  return section;
};