import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos = signal<string[]>([]); // Using signal for reactive to-do list

  constructor() {}

  getTodos() {
    return this.todos();
  }

  addTodo(todo: string) {
    if (todo) {
      this.todos.set([...this.todos(), todo]); // Reactive update
    }
  }

  removeTodo(index: number) {
    const updatedTodos = this.todos().filter((_, i) => i !== index);
    this.todos.set(updatedTodos); // Reactive update
  }
}
