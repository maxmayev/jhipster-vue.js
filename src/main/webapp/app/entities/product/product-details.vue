<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="product">
                <h2 class="jh-entity-heading"><span>Product</span> {{product.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{product.name}}</span>
                    </dd>
                    <dt>
                        <span>Cost</span>
                    </dt>
                    <dd>
                        <span>{{product.cost}}</span>
                    </dd>
                    <dt>
                        <span>Picture</span>
                    </dt>
                    <dd>
                        <div v-if="product.picture">
                            <a v-on:click="openFile(product.pictureContentType, product.picture)">
                                <img v-bind:src="'data:' + product.pictureContentType + ';base64,' + product.picture" style="max-width: 100%;" alt="product image"/>
                            </a>
                            {{product.pictureContentType}}, {{byteSize(product.picture)}}
                        </div>
                    </dd>
                    <dt>
                        <span>Category Name</span>
                    </dt>
                    <dd>
                        <span v-for="(categoryName, i) in product.categoryNames" :key="categoryName.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'CategoryView', params: {categoryId: categoryName.id}}">{{categoryName.name}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="product.id" :to="{name: 'ProductEdit', params: {productId: product.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./product-details.component.ts">
</script>
