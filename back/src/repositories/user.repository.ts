import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoatlasDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.ID,
  UserRelations
  > {
  constructor(
    @inject('datasources.mongoatlas') dataSource: MongoatlasDataSource,
  ) {
    super(User, dataSource);
  }
}
