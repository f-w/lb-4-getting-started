import {inject} from '@loopback/core';
import {juggler, AnyObject} from '@loopback/repository';
const config = require('./calculator.datasource.json');

export class CalculatorDataSource extends juggler.DataSource {
  static dataSourceName = 'calculator';

  constructor(
    @inject('datasources.config.calculator', {optional: true})
    dsConfig: AnyObject = config
  ) {
    super(dsConfig);
  }
}
