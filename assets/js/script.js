// Arreglo inicial con 3 tareas
const tareas = [
  { id: 1, descripcion: "Estudiar JavaScript", completado: false },
  { id: 2, descripcion: "Hacer ejercicio", completado: true },
  { id: 3, descripcion: "Leer 20 minutos", completado: false }
];

// Referencias del DOM
const listaTareas = document.getElementById("listaTareas");
const totalTareas = document.getElementById("totalTareas");
const tareasRealizadas = document.getElementById("tareasRealizadas");
const inputTarea = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");

// Renderizar tareas
function renderizarTareas() {
  listaTareas.innerHTML = "";

  for (let tarea of tareas) {
    listaTareas.innerHTML += `
      <tr>
        <td>${tarea.id}</td>
        <td class="${tarea.completado ? "tachada" : ""}">
          ${tarea.descripcion}
        </td>
        <td>
          <input type="checkbox"
            ${tarea.completado ? "checked" : ""}
            onclick="cambiarEstado(${tarea.id})">
        </td>
        <td>
          <button onclick="eliminarTarea(${tarea.id})">❌</button>
        </td>
      </tr>
    `;
  }

  actualizarResumen();
}

// Agregar nueva tarea
btnAgregar.addEventListener("click", function () {
  const descripcion = inputTarea.value.trim();

  if (descripcion === "") return;

  const nuevaTarea = {
    id: tareas.length + 1,
    descripcion: descripcion,
    completado: false
  };

  tareas.push(nuevaTarea);

  inputTarea.value = "";
  renderizarTareas();
});

// Eliminar tarea
function eliminarTarea(id) {
  const index = tareas.findIndex(t => t.id === id);
  tareas.splice(index, 1);

  reordenarIds(); // 👈 reorganiza los IDs

  renderizarTareas();
}

// Reordenar IDs para que siempre sean 1,2,3...
function reordenarIds() {
  tareas.forEach((tarea, index) => {
    tarea.id = index + 1;
  });
}

// Cambiar estado
function cambiarEstado(id) {
  const tarea = tareas.find(t => t.id === id);
  tarea.completado = !tarea.completado;
  renderizarTareas();
}

// Actualizar resumen
function actualizarResumen() {
  totalTareas.textContent = tareas.length;

  const realizadas = tareas.filter(t => t.completado).length;
  tareasRealizadas.textContent = realizadas;
}

// Render inicial
renderizarTareas();