import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getSingleTask(@Param('id') id): Task {
    return this.tasksService.getSingleTask(id);
  }

  @Patch(':id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTask(id, status);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
