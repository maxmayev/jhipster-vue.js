/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ConsumerDetailComponent from '@/entities/consumer/consumer-details.vue';
import ConsumerClass from '@/entities/consumer/consumer-details.component';
import ConsumerService from '@/entities/consumer/consumer.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Consumer Management Detail Component', () => {
    let wrapper: Wrapper<ConsumerClass>;
    let comp: ConsumerClass;
    let consumerServiceStub: SinonStubbedInstance<ConsumerService>;

    beforeEach(() => {
      consumerServiceStub = sinon.createStubInstance<ConsumerService>(ConsumerService);

      wrapper = shallowMount<ConsumerClass>(ConsumerDetailComponent, {
        store,
        localVue,
        provide: { consumerService: () => consumerServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundConsumer = { id: 123 };
        consumerServiceStub.find.resolves(foundConsumer);

        // WHEN
        comp.retrieveConsumer(123);
        await comp.$nextTick();

        // THEN
        expect(comp.consumer).toBe(foundConsumer);
      });
    });
  });
});
