<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterProjectApp.product.home.createOrEditLabel">Create or edit a Product</h2>
                <div>
                    <div class="form-group" v-if="product.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="product.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="product-name">Name</label>
                        <input type="text" class="form-control" name="name" id="product-name"
                            :class="{'valid': !$v.product.name.$invalid, 'invalid': $v.product.name.$invalid }" v-model="$v.product.name.$model"  required/>
                        <div v-if="$v.product.name.$anyDirty && $v.product.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="product-cost">Cost</label>
                        <input type="number" class="form-control" name="cost" id="product-cost"
                            :class="{'valid': !$v.product.cost.$invalid, 'invalid': $v.product.cost.$invalid }" v-model.number="$v.product.cost.$model"  required/>
                        <div v-if="$v.product.cost.$anyDirty && $v.product.cost.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.cost.required">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.product.cost.number">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="product-picture">Picture</label>
                        <div>
                            <img v-bind:src="'data:' + product.pictureContentType + ';base64,' + product.picture" style="max-height: 100px;" v-if="product.picture" alt="product image"/>
                            <div v-if="product.picture" class="form-text text-danger clearfix">
                                <span class="pull-left">{{product.pictureContentType}}, {{byteSize(product.picture)}}</span>
                                <button type="button" v-on:click="clearInputImage('picture', 'pictureContentType', 'file_picture')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_picture" id="file_picture" v-on:change="setFileData($event, product, 'picture', true)" accept="image/*"/>
                        </div>
                        <input type="hidden" class="form-control" name="picture" id="product-picture"
                            :class="{'valid': !$v.product.picture.$invalid, 'invalid': $v.product.picture.$invalid }" v-model="$v.product.picture.$model" />
                        <input type="hidden" class="form-control" name="pictureContentType" id="product-pictureContentType"
                            v-model="product.pictureContentType" />
                    </div>
                    <div class="form-group">
                        <label for="product-categoryName">Category Name</label>
                        <select class="form-control" id="product-categoryName" multiple name="categoryName" v-model="product.categoryNames">
                            <option v-bind:value="getSelected(product.categoryNames, categoryOption)" v-for="categoryOption in categories" :key="categoryOption.id">{{categoryOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.product.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./product-update.component.ts">
</script>
