import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

const client = generateClient<Schema>();

@Component({
  selector: 'app-todos',
  imports: [CommonModule, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: any[] = [];
  listSub?: Subscription | null;
  createSub?: Subscription | null;
  updateSub?: Subscription | null;
  deleteSub?: Subscription | null;

  ngOnInit(): void {
    this.listSub = this.listTodos();
    this.setupListeners();
  }

  listTodos(): Subscription | null {
    try {
      return client.models.Todo.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.todos = items;
        },
      });
    } catch (error) {
      console.error('error fetching todos', error);
    }
    return null;
  }

  setupListeners(): void {
    this.createSub = client.models.Todo.onCreate().subscribe({
      next: (data) => console.log('onCreate', data),
      error: (error) => console.warn(error),
    });

    this.updateSub = client.models.Todo.onUpdate().subscribe({
      next: (data) => console.log('onUpdate', data),
      error: (error) => console.warn(error),
    });

    this.deleteSub = client.models.Todo.onDelete().subscribe({
      next: (data) => console.log('onDelete', data),
      error: (error) => console.warn(error),
    });

  }

  createTodo() {
    try {
      client.models.Todo.create({
        content: window.prompt('Todo content'),
      });
    } catch (error) {
      console.error('error creating todos', error);
    }
  }

  deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  ngOnDestroy(): void {
    this.listSub?.unsubscribe();
    this.createSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }

  async updateTodo(todo: any) {
    const updated = {
      id: todo.id,
      isDone: todo.isDone
    };

    try {
      const { data: updatedTodo, errors } = await client.models.Todo.update(updated);
      if(errors) {
        console.error('todo failed to update', errors)
      } else {
        console.log('todo updated successfully', updatedTodo);
      }
    } catch(error) {
      console.error('todo failed to update', error)
    }
  }

  async toggleDone($event: any, todo: any) {
    console.log($event);
    todo.isDone = $event.target.checked;
    await this.updateTodo(todo);
  }
}
