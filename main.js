const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const botonAgregar = document.querySelector('#botonAgregar');
const check = 'bi-check2-circle';
const tachado = 'tachado';
const uncheck = 'bi-record';
let LIST;
let id;

// Fecha actual
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});

// Función para agregar tarea
function agregarTarea(tarea, id, hecho, eliminar) {
    if (eliminar) {
        return;
    };
    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';
    const elemento = `
        <li id="elemento">
            <i id="${id}" data="hecho" class="bi ${realizado}"></i>
            <p class="tarea-lista text ${LINE}">${tarea}</p>
            <i id="${id}" data="eliminar" class="bi bi-trash"></i>
        </li>
    `;
    lista.insertAdjacentHTML("beforeend", elemento);
}

// Función para marcar tarea como realizada
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(tachado);
    LIST[element.id].realizado = !LIST[element.id].realizado;
}

// Función para eliminar tarea
function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
}

// Agregar tarea al hacer clic
botonAgregar.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";
    }
});

// Detectar clics en la lista
lista.addEventListener("click", function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if (elementData == "hecho") {
        tareaRealizada(element);
    } else if (elementData == "eliminar") {
        tareaEliminada(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Cargar lista desde localStorage
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
}

// Función para cargar la lista
function cargarLista(array) {
    array.forEach(function (item) {
        agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
    });
}