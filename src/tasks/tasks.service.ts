import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksFilter(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;

    let tasks = this.getAllTasks();
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    return tasks;
  }

  getSingleTask(id: string): Task {
    const found = this.tasks.find((item) => item.id === id);

    if (!found) {
      throw new NotFoundException(`Task with id ${id} is not found`);
    }
    return found;
  }

  updateTask(id: string, status): Task {
    const task = this.getSingleTask(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string): void {
    this.getSingleTask(id);
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }

  createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
