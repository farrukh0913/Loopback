import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  name: 'mongoatlas',
  connector: 'mongodb',
  url: process.env.mongodb_uri,
  host: 'loopback-cluster.3zxbh.mongodb.net',
  port: 27017,
  user: 'farrukhkhan0913',
  password: 'PtQM0oIwGqP1UJe9',
  database: 'loopback-cluster',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoatlasDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongoatlas';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongoatlas', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
