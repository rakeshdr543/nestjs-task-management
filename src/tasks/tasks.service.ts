import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} is not found`);
    }
    return found;
  }

  // getSingleTask(id: string): Task {
  //   const found = this.tasks.find((item) => item.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with id ${id} is not found`);
  //   }
  //   return found;
  // }

  async updateTask(id: string, status): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} is not found`);
    }
  }

  createTask(createTaskDto: createTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
}
