import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Rakesh',
  id: '1223',
  password: 'password',
  tasks: [],
};

const mockTask = {
  id: 'domeid',
  title: 'sometask',
  description: 'some desc',
  status: TaskStatus.OPEN,
};

describe('taskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls tasks repository getTasks and returns result'),
      () => {
        tasksRepository.getTasks.mockResolvedValue('somevalue');
        const result = tasksService.getTasks(null, mockUser);
        expect(result).toEqual('somevalue');
      };
  });

  describe('getTaskById', () => {
    it('calls tasks repository findone and return one', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = tasksService.getTaskById('someid', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls tasks repository findone and throws exception', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someid', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
