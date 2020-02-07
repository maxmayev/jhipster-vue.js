<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="purchase">
                <h2 class="jh-entity-heading"><span>Purchase</span> {{purchase.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Order Date</span>
                    </dt>
                    <dd>
                        <span>{{purchase.orderDate}}</span>
                    </dd>
                    <dt>
                        <span>Consumer Name</span>
                    </dt>
                    <dd>
                        <div v-if="purchase.consumerName">
                            <router-link :to="{name: 'ConsumerView', params: {consumerId: purchase.consumerName.id}}">{{purchase.consumerName.firstName}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span>Product Name</span>
                    </dt>
                    <dd>
                        <span v-for="(productName, i) in purchase.productNames" :key="productName.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'ProductView', params: {productId: productName.id}}">{{productName.name}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="purchase.id" :to="{name: 'PurchaseEdit', params: {purchaseId: purchase.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./purchase-details.component.ts">
</script>
