/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ConsumerUpdateComponent from '@/entities/consumer/consumer-update.vue';
import ConsumerClass from '@/entities/consumer/consumer-update.component';
import ConsumerService from '@/entities/consumer/consumer.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Consumer Management Update Component', () => {
    let wrapper: Wrapper<ConsumerClass>;
    let comp: ConsumerClass;
    let consumerServiceStub: SinonStubbedInstance<ConsumerService>;

    beforeEach(() => {
      consumerServiceStub = sinon.createStubInstance<ConsumerService>(ConsumerService);

      wrapper = shallowMount<ConsumerClass>(ConsumerUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          consumerService: () => consumerServiceStub
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.consumer = entity;
        consumerServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(consumerServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.consumer = entity;
        consumerServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(consumerServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
