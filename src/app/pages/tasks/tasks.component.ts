import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AwsService } from '../../data/services/aws.service';
import { V6Client } from '@aws-amplify/api-graphql';
import type { Schema } from '../../../../amplify/data/resource';
import { DefaultCommonClientOptions } from '@aws-amplify/api-graphql/internals';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatFormField,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatNativeDateModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit, OnDestroy {
  protected createTaskForm: FormGroup;
  newTitleControl: FormControl;
  newDescControl: FormControl;
  newNotesControl: FormControl;
  newDueDateControl: FormControl;

  tasks: any[] = [];
  listSub?: Subscription | null;
  createSub?: Subscription | null;
  updateSub?: Subscription | null;
  deleteSub?: Subscription | null;
  private client: V6Client<Schema, DefaultCommonClientOptions>;
  readonly availableStatus: string[] = [
    'COMPLETED',
    'TODO',
    'IN_PROGRESS',
    'BLOCKED',
  ];

  constructor(private awsService: AwsService,
              private fb: FormBuilder) {
    this.client = this.awsService.awsClient;
    this.createTaskForm = this.fb.group({
      newTitle: ['New Task Title @' + Date.now().toLocaleString(), Validators.required,],
      newDesc: ['New Task Description @' + Date.now().toLocaleString()],
      newNotes: [''],
      newDueDate: [],
    });
    this.newTitleControl = this.createTaskForm.get('newTitle') as FormControl;
    this.newDescControl = this.createTaskForm.get('newDesc') as FormControl;
    this.newNotesControl = this.createTaskForm.get('newNotes') as FormControl;
    this.newDueDateControl = this.createTaskForm.get('newDueDate') as FormControl;
  }

  ngOnInit(): void {
    this.listSub = this.listTodos();
    this.setupListeners();
  }

  listTodos(): Subscription | null {
    try {
      return this.client.models.Task.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.tasks = items;
        },
      });
    } catch (error) {
      console.error('error fetching tasks', error);
    }
    return null;
  }

  setupListeners(): void {
    this.createSub = this.client.models.Task.onCreate().subscribe({
      next: (data) => console.log('onCreate', data),
      error: (error) => console.warn(error),
    });

    this.updateSub = this.client.models.Task.onUpdate().subscribe({
      next: (data) => console.log('onUpdate', data),
      error: (error) => console.warn(error),
    });

    this.deleteSub = this.client.models.Task.onDelete().subscribe({
      next: (data) => console.log('onDelete', data),
      error: (error) => console.warn(error),
    });

  }

  createTask() {
    const title: string = this.newTitleControl.value,
      dueDate: Date = this.newDueDateControl.value,
      description: string = this.newDescControl.value,
      notes: string = this.newNotesControl.value;
    try {
      this.client.models.Task.create({
        title,
        description,
        dueDate: dueDate.toISOString(),
        notes,
        status: 'TODO',
      });
    } catch (error) {
      console.error('error creating tasks', error);
    }
  }

  deleteTask(id: string) {
    this.client.models.Task.delete({ id });
  }

  ngOnDestroy(): void {
    this.listSub?.unsubscribe();
    this.createSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }

  async updateTask(task: any) {
    try {
      const response = await this.client.models.Task.update(task);
      const { data: updatedTask, errors } = response;
      if (errors) {
        console.error('task failed to update', errors);
      } else {
        console.log('task updated successfully', updatedTask);
      }
    } catch (error) {
      console.error('task failed to update', error);
    }
  }

  async onStatusChange(task: any, $event: MatSelectChange<any>) {
    const updated = {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      notes: task.notes,
      status: $event.value,
    }
    await this.updateTask(updated)
  }
}
