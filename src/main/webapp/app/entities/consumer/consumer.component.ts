import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IConsumer } from '@/shared/model/consumer.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import JhiDataUtils from '@/shared/data/data-utils.service';

import ConsumerService from './consumer.service';

@Component
export default class Consumer extends mixins(JhiDataUtils, Vue2Filters.mixin, AlertMixin) {
  @Inject('consumerService') private consumerService: () => ConsumerService;
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public consumers: IConsumer[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllConsumers();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllConsumers();
  }

  public retrieveAllConsumers(): void {
    this.isFetching = true;

    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    this.consumerService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.consumers = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IConsumer): void {
    this.removeId = instance.id;
  }

  public removeConsumer(): void {
    this.consumerService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Consumer is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllConsumers();
        this.closeDialog();
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllConsumers();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
