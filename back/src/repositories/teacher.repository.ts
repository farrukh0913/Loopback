import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoatlasDataSource} from '../datasources/mongoatlas.datasource';
import {Teacher, TeacherRelations} from '../models/teacher.model';

export class TeacherRepository extends DefaultCrudRepository<
  Teacher,
  typeof Teacher.prototype.ID,
  TeacherRelations
> {
  constructor(
    @inject('datasources.userInfo') dataSource: MongoatlasDataSource,
  ) {
    super(Teacher, dataSource);
  }
}
