import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Get(':id')
  getTaskById(@Param('id') id): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Patch(':id/status')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskDto;
  //   return this.tasksService.updateTask(id, status);
  // }

  // @Delete(':id')
  // deleteTaskById(@Param('id') id): void {
  //   return this.tasksService.deleteTaskById(id);
  // }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
}
