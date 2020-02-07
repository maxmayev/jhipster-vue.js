import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ConsumerService from '../consumer/consumer.service';
import { IConsumer } from '@/shared/model/consumer.model';

import ProductService from '../product/product.service';
import { IProduct } from '@/shared/model/product.model';

import AlertService from '@/shared/alert/alert.service';
import { IPurchase, Purchase } from '@/shared/model/purchase.model';
import PurchaseService from './purchase.service';

const validations: any = {
  purchase: {
    orderDate: {
      required
    }
  }
};

@Component({
  validations
})
export default class PurchaseUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('purchaseService') private purchaseService: () => PurchaseService;
  public purchase: IPurchase = new Purchase();

  @Inject('consumerService') private consumerService: () => ConsumerService;

  public consumers: IConsumer[] = [];

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public count = 0;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.purchaseId) {
        vm.retrievePurchase(to.params.purchaseId);
      }
      vm.initRelationships();
    });
  }
  counter(): void {
    this.count++;
  }

  created(): void {
    this.purchase.productNames = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.purchase.id) {
      this.purchaseService()
        .update(this.purchase)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Purchase is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.purchaseService()
        .create(this.purchase)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Purchase is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrievePurchase(purchaseId): void {
    this.purchaseService()
      .find(purchaseId)
      .then(res => {
        this.purchase = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.consumerService()
      .retrieve()
      .then(res => {
        this.consumers = res.data;
      });
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
