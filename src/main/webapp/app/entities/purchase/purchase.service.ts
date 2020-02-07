import axios from 'axios';

import { IPurchase } from '@/shared/model/purchase.model';

const baseApiUrl = 'api/purchases';

export default class PurchaseService {
  public find(id: number): Promise<IPurchase> {
    return new Promise<IPurchase>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl).then(function(res) {
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

  public create(entity: IPurchase): Promise<IPurchase> {
    return new Promise<IPurchase>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IPurchase): Promise<IPurchase> {
    return new Promise<IPurchase>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
