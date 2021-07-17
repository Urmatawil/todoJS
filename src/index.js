import "./css/styles.css";
import { TodoList } from "./classes";
import { crearTodoHtml } from "./js/components";

export const lista = new TodoList();
/*
lista.todos.forEach((element) => {
	crearTodoHtml(element);
}*/
lista.todos.forEach(crearTodoHtml);
