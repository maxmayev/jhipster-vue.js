<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterProjectApp.purchase.home.createOrEditLabel">Create or edit a Purchase</h2>
                <div>
                    <div class="form-group" v-if="purchase.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="purchase.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="purchase-orderDate">Order Date</label>
                        <div class="input-group">
                            <input id="purchase-orderDate" type="date" class="form-control" name="orderDate"  :class="{'valid': !$v.purchase.orderDate.$invalid, 'invalid': $v.purchase.orderDate.$invalid }"
                            v-model="$v.purchase.orderDate.$model"  required />
                        </div>
                        <div v-if="$v.purchase.orderDate.$anyDirty && $v.purchase.orderDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.purchase.orderDate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="purchase-consumerName">Consumer Name</label>
                        <select class="form-control" id="purchase-consumerName" name="consumerName" v-model="purchase.consumerName">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="purchase.consumerName && consumerOption.id === purchase.consumerName.id ? purchase.consumerName : consumerOption" v-for="consumerOption in consumers" :key="consumerOption.id">{{consumerOption.firstName}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="purchase-productName">Product Name</label>
                        <select class="form-control" id="purchase-productName" multiple name="productName" v-model="purchase.productNames">
                            <option v-bind:value="getSelected(purchase.productNames, productOption)" v-for="productOption in products" :key="productOption.id">{{productOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.purchase.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./purchase-update.component.ts">
</script>
