import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Teacher} from '../models/teacher.model';
import {TeacherRepository} from '../repositories/teacher.repository';

export class TeacherController {
  constructor(
    @repository(TeacherRepository)
    public teacherRepository: TeacherRepository,
  ) { }

  @post('/teacher')
  @response(200, {
    description: 'Teacher model instance',
    content: {'application/json': {schema: getModelSchemaRef(Teacher)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Teacher, {
            title: 'NewTeacher',
            exclude: ['ID'],
          }),
        },
      },
    })
    teacher: Omit<Teacher, 'ID'>,
  ): Promise<Teacher> {
    return this.teacherRepository.create(teacher);
  }

  @get('/teacher/count')
  @response(200, {
    description: 'Teacher model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Teacher) where?: Where<Teacher>,
  ): Promise<Count> {
    return this.teacherRepository.count(where);
  }

  @get('/teacher')
  @response(200, {
    description: 'Array of Teacher model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Teacher, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Teacher) filter?: Filter<Teacher>,
  ): Promise<Teacher[]> {
    return this.teacherRepository.find(filter);
  }

  @patch('/teacher')
  @response(200, {
    description: 'Teacher PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Teacher, {partial: true}),
        },
      },
    })
    teacher: Teacher,
    @param.where(Teacher) where?: Where<Teacher>,
  ): Promise<Count> {
    return this.teacherRepository.updateAll(teacher, where);
  }

  @get('/teacher/{id}')
  @response(200, {
    description: 'Teacher model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Teacher, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Teacher, {exclude: 'where'}) filter?: FilterExcludingWhere<Teacher>
  ): Promise<Teacher> {
    return this.teacherRepository.findById(id, filter);
  }

  @patch('/teacher/{id}')
  @response(204, {
    description: 'Teacher PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Teacher, {partial: true}),
        },
      },
    })
    teacher: Teacher,
  ): Promise<void> {
    await this.teacherRepository.updateById(id, teacher);
  }

  @put('/teacher/{id}')
  @response(204, {
    description: 'Teacher PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() teacher: Teacher,
  ): Promise<void> {
    await this.teacherRepository.replaceById(id, teacher);
  }

  @del('/teacher/{id}')
  @response(204, {
    description: 'Teacher DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.teacherRepository.deleteById(id);
  }
}
