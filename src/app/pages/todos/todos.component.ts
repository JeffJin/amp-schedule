import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AwsService } from '../../data/services/aws.service';
import { V6Client } from '@aws-amplify/api-graphql';
import type { Schema } from '../../../../amplify/data/resource';
import { DefaultCommonClientOptions } from '@aws-amplify/api-graphql/internals';

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
  private client: V6Client<Schema, DefaultCommonClientOptions>;
  constructor(private awsService: AwsService) {
    this.client = this.awsService.awsClient;
  }

  ngOnInit(): void {
    this.listSub = this.listTodos();
    this.setupListeners();
  }

  listTodos(): Subscription | null {
    try {
      return this.client.models.Todo.observeQuery().subscribe({
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
    this.createSub = this.client.models.Todo.onCreate().subscribe({
      next: (data) => console.log('onCreate', data),
      error: (error) => console.warn(error),
    });

    this.updateSub = this.client.models.Todo.onUpdate().subscribe({
      next: (data) => console.log('onUpdate', data),
      error: (error) => console.warn(error),
    });

    this.deleteSub = this.client.models.Todo.onDelete().subscribe({
      next: (data) => console.log('onDelete', data),
      error: (error) => console.warn(error),
    });

  }

  createTodo() {
    try {
      this.client.models.Todo.create({
        content: window.prompt('Todo content'),
        isDone: false,
      });
    } catch (error) {
      console.error('error creating todos', error);
    }
  }

  deleteTodo(id: string) {
    this.client.models.Todo.delete({ id });
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
      const { data: updatedTodo, errors } = await this.client.models.Todo.update(updated);
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
