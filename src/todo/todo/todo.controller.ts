import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TodoDTO } from './todo.dto';
import { todos } from './todos.mock';

let todosList: TodoDTO[] = todos;

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todos.' })
  @Get()
  getTodos(): TodoDTO[] {
    return todosList;
  }

  @ApiOperation({ summary: 'Create todo' })
  @ApiResponse({ status: 200, description: 'Create todo.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  createTodo(@Body() todo: TodoDTO): TodoDTO[] {
    todosList.push({ ...todo, id: todosList.length + 1 });
    return todosList;
  }

  // swagger decorators for put and delete
  @ApiOperation({ summary: 'Update todo' })
  @ApiResponse({ status: 200, description: 'Update todo.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() todo: TodoDTO): TodoDTO[] {
    todosList = todosList.map((t) => {
      if (t.id?.toString() === id) {
        return todo;
      }
      return t;
    });
    return todosList;
  }

  @ApiOperation({ summary: 'Delete todo' })
  @ApiOperation({ description: 'Delete todo' })
  @Delete(':id')
  deleteTodoById(@Param('id') id: string): TodoDTO[] {
    todosList = todosList.filter((t) => t.id?.toString() !== id);
    return todosList;
  }
}
