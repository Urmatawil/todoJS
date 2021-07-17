import { Todo } from "../classes";
import { lista } from "../index";

const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const clearTodos = document.querySelector(".clear-completed");
const listaFiltros = document.querySelector(".footer");
const anchorFiltros = document.querySelectorAll(".filtro");
export const contador = document.querySelector("strong");

/*--------------------------------------------*/

export const crearTodoHtml = (todo) => {
	const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${
					todo.completado ? "checked" : ""
				}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
</li>
    `;

	const div = document.createElement("div");
	div.innerHTML = htmlTodo;
	divTodoList.append(div.firstElementChild);
	return div;
};

/*-----------------------------------------------*/

txtInput.addEventListener("keyup", (ev) => {
	if (ev.keyCode === 13 && txtInput.textLength > 0) {
		const tarea = new Todo(txtInput.value);
		lista.nuevosTodo(tarea);
		crearTodoHtml(tarea);
		txtInput.value = "";
	}
});

/*-----------------------------------------------*/

divTodoList.addEventListener("click", (ev) => {
	const nombreElem = ev.target.localName;

	const elementoCompleto = ev.target.parentElement.parentElement;

	const elementoId = elementoCompleto.getAttribute("data-id");

	if (nombreElem.includes("input")) {
		lista.marcarCompletado(elementoId);
		elementoCompleto.classList.toggle("completed");
	}

	if (nombreElem.includes("button")) {
		lista.eliminarCompletado(elementoId);
		divTodoList.removeChild(elementoCompleto);
	}
});

/*-----------------------------------------------*/

clearTodos.addEventListener("click", () => {
	lista.eliminarTodo();

	for (let i = divTodoList.children.length - 1; i >= 0; i--) {
		const elemento = divTodoList.children[i];

		if (elemento.classList.contains("completed")) {
			divTodoList.removeChild(elemento);
		}
	}
});

/*-----------------------------------------------*/

listaFiltros.addEventListener("click", (ev) => {
	const filtro = ev.target.text;
	if (!filtro) {
		return;
	}

	anchorFiltros.forEach((element) => element.classList.remove("selected"));
	ev.target.classList.add("selected");

	for (const elemento of divTodoList.children) {
		elemento.classList.remove("hidden");
		const completado = elemento.classList.contains("completed");

		switch (filtro) {
			case "Pendientes":
				if (completado) {
					elemento.classList.add("hidden");
				}
				break;

			case "Completados":
				if (!completado) {
					elemento.classList.add("hidden");
				}
				break;
		}
	}
});

/*-----------------------------------------------*/
