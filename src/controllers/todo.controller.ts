import { repository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { TodoRepository } from '../repositories';
import { Todo } from '../models';
import { GeocoderService } from '../services';
import {
  HttpErrors,
  post,
  param,
  requestBody,
  get,
  put,
  patch,
  del,
} from '@loopback/rest';

export class TodoController {
  constructor(@repository(TodoRepository) protected todoRepo: TodoRepository,
    @inject('services.GeocoderService') protected geoService: GeocoderService,
  ) { }

  @post('/todos')
  async createTodo(@requestBody() todo: Todo) {
    if (!todo.title) {
      throw new HttpErrors.BadRequest('title is required');
    }
    if (todo.remindAtAddress) {
      // TODO handle "address not found"
      const geo = await this.geoService.geocode(todo.remindAtAddress);
      // Encode the coordinates as "lat,lng"
      todo.remindAtGeo = `${geo[0].y},${geo[0].x}`;
    }

    return await this.todoRepo.create(todo);
  }

  @get('/todos/{id}')
  async findTodoById(@param.path.number('id') id: number): Promise<Todo> {
    return await this.todoRepo.findById(id);
  }

  @get('/todos')
  async findTodos(): Promise<Todo[]> {
    return await this.todoRepo.find();
  }

  @put('/todos/{id}')
  async replaceTodo(
    @param.path.number('id') id: number,
    @requestBody() todo: Todo,
  ): Promise<boolean> {
    return await this.todoRepo.replaceById(id, todo);
  }

  @patch('/todos/{id}')
  async updateTodo(
    @param.path.number('id') id: number,
    @requestBody() todo: Todo,
  ): Promise<boolean> {
    return await this.todoRepo.updateById(id, todo);
  }

  @del('/todos/{id}')
  async deleteTodo(@param.path.number('id') id: number): Promise<boolean> {
    return await this.todoRepo.deleteById(id);
  }
}
