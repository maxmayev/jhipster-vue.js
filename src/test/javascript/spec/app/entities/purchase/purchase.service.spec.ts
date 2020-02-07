/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_FORMAT } from '@/shared/date/filters';
import PurchaseService from '@/entities/purchase/purchase.service';
import { Purchase } from '@/shared/model/purchase.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('Purchase Service', () => {
    let service: PurchaseService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new PurchaseService();
      currentDate = new Date();

      elemDefault = new Purchase(0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            orderDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a Purchase', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            orderDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            orderDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Purchase', async () => {
        const returnedFromService = Object.assign(
          {
            orderDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            orderDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of Purchase', async () => {
        const returnedFromService = Object.assign(
          {
            orderDate: format(currentDate, DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            orderDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a Purchase', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });
    });
  });
});
