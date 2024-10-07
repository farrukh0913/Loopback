import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoatlasDataSource} from '../datasources';
import {Student, StudentRelations} from '../models/student.model';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.ID,
  StudentRelations
> {
  constructor(
    @inject('datasources.userInfo') dataSource: MongoatlasDataSource,
  ) {
    super(Student, dataSource);
  }
}
