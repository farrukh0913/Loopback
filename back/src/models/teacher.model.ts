import {Entity, model, property} from '@loopback/repository';

@model()
export class Teacher extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  ID?: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  classAssigned?: string[];

  @property({
    type: 'string',
  })
  classId?: string;

  constructor(data?: Partial<Teacher>) {
    super(data);
  }
}

export interface TeacherRelations {
  // describe navigational properties here
}

export type TeacherWithRelations = Teacher & TeacherRelations;
