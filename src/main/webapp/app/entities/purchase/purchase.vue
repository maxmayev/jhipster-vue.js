<template>
    <div>
        <h2 id="page-heading">
            <span id="purchase-heading">Purchases</span>
            <router-link :to="{name: 'PurchaseCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-purchase">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Purchase
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && purchases && purchases.length === 0">
            <span>No purchases found</span>
        </div>
        <div class="table-responsive" v-if="purchases && purchases.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Order Date</span></th>
                    <th><span>Consumer Name</span></th>
                    <th><span>Product Name</span></th>
                    <th><span>Product count</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="purchase in purchases"
                    :key="purchase.id">
                    <td>
                        <router-link :to="{name: 'PurchaseView', params: {purchaseId: purchase.id}}">{{purchase.id}}</router-link>
                    </td>
                    <td>{{purchase.orderDate}}</td>
                    <td>
                        <div v-if="purchase.consumerName">
                            <router-link :to="{name: 'ConsumerView', params: {consumerId: purchase.consumerName.id}}">{{purchase.consumerName.firstName}}</router-link>
                        </div>
                    </td>
                    <td>
                        <span v-for="(productName, i) in purchase.productNames" :key="productName.id">{{i > 0 ? ', ' : ''}}
                            <router-link class="form-control-static" :to="{name: 'ProductView', params: {productId: productName.id}}">{{productName.name}}</router-link>
                        </span>
                    </td>
                    <td>
                            {{purchase.productNames.length}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'PurchaseView', params: {purchaseId: purchase.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'PurchaseEdit', params: {purchaseId: purchase.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(purchase)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="jhipsterProjectApp.purchase.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-purchase-heading" >Are you sure you want to delete this Purchase?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-purchase" v-on:click="removePurchase()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./purchase.component.ts">
</script>
