import { Todo } from "./todo.class";
import { contador } from "../js/components";

export class TodoList {
	constructor() {
		this.cargarLocalStorage();
	}
	/*------------------------------------------*/
	nuevosTodo(todo) {
		this.todos.push(todo);
		this.guardarLocalStorage();
		this.calcularPendientes(this.todos);
	}
	/*------------------------------------------*/
	eliminarCompletado(id) {
		this.todos = this.todos.filter((todo) => todo.id != id);
		this.calcularPendientes(this.todos);
		this.guardarLocalStorage();
	}
	/*------------------------------------------*/
	marcarCompletado(id) {
		for (const todo of this.todos) {
			if (todo.id == id) {
				todo.completado = !todo.completado;
				this.guardarLocalStorage();
				this.calcularPendientes(this.todos);
				break;
			}
		}
	}
	/*------------------------------------------*/
	eliminarTodo() {
		this.todos = this.todos.filter((todo) => !todo.completado);
		this.guardarLocalStorage();
		this.calcularPendientes(this.todos);
	}
	/*------------------------------------------*/
	guardarLocalStorage() {
		localStorage.setItem("todo", JSON.stringify(this.todos));
	}
	/*------------------------------------------*/
	cargarLocalStorage() {
		this.todos = localStorage.getItem("todo")
			? JSON.parse(localStorage.getItem("todo"))
			: [];

		this.todos = this.todos.map(Todo.fromJson);
		this.calcularPendientes(this.todos);
	}
	/*------------------------------------------*/
	calcularPendientes() {
		let pendientes = 0;
		this.todos.forEach((todo) => {
			if (!todo.completado) {
				pendientes++;
			}
		});
		return (contador.innerText = pendientes);
	}
}
