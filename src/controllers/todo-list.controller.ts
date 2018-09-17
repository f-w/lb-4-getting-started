import {Filter, Where, repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import {TodoList} from '../models';
import {TodoListRepository} from '../repositories';

export class TodoListController {
  constructor(
    @repository(TodoListRepository)
    public todoListRepository : TodoListRepository,
  ) {}

  @post('/todo-lists', {
    responses: {
      '200': {
        description: 'TodoList model instance',
        content: {'application/json': {'x-ts-type': TodoList}},
      },
    },
  })
  async create(@requestBody() TodoList: TodoList)
    : Promise<TodoList> {
    return await this.todoListRepository.create(TodoList);
  }

  @get('/todo-lists/count', {
    responses: {
      '200': {
        description: 'TodoList model count',
        content: {'application/json': {'x-ts-type': Number}},
      },
    },
  })
  async count(@param.query.string('where') where?: Where): Promise<number> {
    return await this.todoListRepository.count(where);
  }

  @get('/todo-lists', {
    responses: {
      '200': {
        description: 'Array of TodoList model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': TodoList}},
          },
        },
      },
    },
  })
  async find(@param.query.string('filter') filter?: Filter)
    : Promise<TodoList[]> {
    return await this.todoListRepository.find(filter);
  }

  @patch('/todo-lists', {
    responses: {
      '200': {
        description: 'TodoList PATCH success count',
        content: {'application/json': {'x-ts-type': Number}},
      },
    },
  })
  async updateAll(
    @requestBody() TodoList: TodoList,
    @param.query.string('where') where?: Where
  ): Promise<number> {
    return await this.todoListRepository.updateAll(TodoList, where);
  }

  @get('/todo-lists/{id}', {
    responses: {
      '200': {
        description: 'TodoList model instance',
        content: {'application/json': {'x-ts-type': TodoList}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<TodoList> {
    return await this.todoListRepository.findById(id);
  }

  @patch('/todo-lists/{id}', {
    responses: {
      '200': {
        description: 'TodoList PATCH success',
        content: {'application/json': {'x-ts-type': Boolean}},
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() TodoList: TodoList
  ): Promise<boolean> {
    return await this.todoListRepository.updateById(id, TodoList);
  }

  @del('/todo-lists/{id}', {
    responses: {
      '200': {
        description: 'TodoList DELETE success',
        content: {'application/json': {'x-ts-type': Boolean}},
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<boolean> {
    return await this.todoListRepository.deleteById(id);
  }
}
