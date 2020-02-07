import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICategory } from '@/shared/model/category.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import CategoryService from './category.service';

@Component
export default class Category extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('categoryService') private categoryService: () => CategoryService;
  private removeId: number = null;
  public categories: ICategory[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCategorys();
  }

  public clear(): void {
    this.retrieveAllCategorys();
  }

  public retrieveAllCategorys(): void {
    this.isFetching = true;

    this.categoryService()
      .retrieve()
      .then(
        res => {
          this.categories = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ICategory): void {
    this.removeId = instance.id;
  }

  public removeCategory(): void {
    this.categoryService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Category is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllCategorys();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
