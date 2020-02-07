import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IConsumer } from '@/shared/model/consumer.model';

const baseApiUrl = 'api/consumers';

export default class ConsumerService {
  public find(id: number): Promise<IConsumer> {
    return new Promise<IConsumer>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity: IConsumer): Promise<IConsumer> {
    return new Promise<IConsumer>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IConsumer): Promise<IConsumer> {
    return new Promise<IConsumer>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
