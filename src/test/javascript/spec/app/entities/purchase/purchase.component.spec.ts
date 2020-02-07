/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PurchaseComponent from '@/entities/purchase/purchase.vue';
import PurchaseClass from '@/entities/purchase/purchase.component';
import PurchaseService from '@/entities/purchase/purchase.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {}
  }
};

describe('Component Tests', () => {
  describe('Purchase Management Component', () => {
    let wrapper: Wrapper<PurchaseClass>;
    let comp: PurchaseClass;
    let purchaseServiceStub: SinonStubbedInstance<PurchaseService>;

    beforeEach(() => {
      purchaseServiceStub = sinon.createStubInstance<PurchaseService>(PurchaseService);
      purchaseServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<PurchaseClass>(PurchaseComponent, {
        store,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          purchaseService: () => purchaseServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      purchaseServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllPurchases();
      await comp.$nextTick();

      // THEN
      expect(purchaseServiceStub.retrieve.called).toBeTruthy();
      expect(comp.purchases[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      purchaseServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removePurchase();
      await comp.$nextTick();

      // THEN
      expect(purchaseServiceStub.delete.called).toBeTruthy();
      expect(purchaseServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
