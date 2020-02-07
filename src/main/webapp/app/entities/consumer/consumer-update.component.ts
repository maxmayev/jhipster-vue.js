import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IConsumer, Consumer } from '@/shared/model/consumer.model';
import ConsumerService from './consumer.service';

const validations: any = {
  consumer: {
    lastName: {
      required
    },
    firstName: {
      required
    },
    patranimicName: {
      required
    },
    phoneNumber: {},
    email: {},
    photo: {}
  }
};

@Component({
  validations
})
export default class ConsumerUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('consumerService') private consumerService: () => ConsumerService;
  public consumer: IConsumer = new Consumer();
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.consumerId) {
        vm.retrieveConsumer(to.params.consumerId);
      }
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.consumer.id) {
      this.consumerService()
        .update(this.consumer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Consumer is updated with identifier ' + param.id;
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.consumerService()
        .create(this.consumer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Consumer is created with identifier ' + param.id;
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveConsumer(consumerId): void {
    this.consumerService()
      .find(consumerId)
      .then(res => {
        this.consumer = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.consumer && field && fieldContentType) {
      if (this.consumer.hasOwnProperty(field)) {
        this.consumer[field] = null;
      }
      if (this.consumer.hasOwnProperty(fieldContentType)) {
        this.consumer[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {}
}
