import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IConsumer } from '@/shared/model/consumer.model';
import ConsumerService from './consumer.service';

@Component
export default class ConsumerDetails extends mixins(JhiDataUtils) {
  @Inject('consumerService') private consumerService: () => ConsumerService;
  public consumer: IConsumer = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.consumerId) {
        vm.retrieveConsumer(to.params.consumerId);
      }
    });
  }

  public retrieveConsumer(consumerId) {
    this.consumerService()
      .find(consumerId)
      .then(res => {
        this.consumer = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
