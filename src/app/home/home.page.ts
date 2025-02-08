import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonList,
    IonButton,
    IonLabel,
  ],
})
export class HomePage {
  // Signal for new Todo input and the to-do list
  newTodo = signal('');
  todos = signal<string[]>([]);

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    // Load the to-do list from the service into the Signal
    this.todos.set(this.todoService.getTodos());
  }

  addTodo() {
    const newTodoValue = this.newTodo();
    if (newTodoValue.trim()) {
      this.todoService.addTodo(newTodoValue);
      this.newTodo.set(''); // Clear input
      this.loadTodos(); // Refresh the list
    }
  }

  removeTodo(index: number) {
    this.todoService.removeTodo(index);
    this.loadTodos(); // Refresh the list
  }
}
