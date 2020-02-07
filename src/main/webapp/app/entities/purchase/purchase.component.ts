import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPurchase } from '@/shared/model/purchase.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import PurchaseService from './purchase.service';

@Component
export default class Purchase extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('purchaseService') private purchaseService: () => PurchaseService;
  private removeId: number = null;
  public purchases: IPurchase[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPurchases();
  }

  public clear(): void {
    this.retrieveAllPurchases();
  }

  public retrieveAllPurchases(): void {
    this.isFetching = true;

    this.purchaseService()
      .retrieve()
      .then(
        res => {
          this.purchases = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IPurchase): void {
    this.removeId = instance.id;
  }

  public removePurchase(): void {
    this.purchaseService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Purchase is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllPurchases();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
