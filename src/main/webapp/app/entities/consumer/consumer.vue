<template>
    <div>
        <h2 id="page-heading">
            <span id="consumer-heading">Consumers</span>
            <router-link :to="{name: 'ConsumerCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-consumer">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create a new Consumer
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
        <div class="alert alert-warning" v-if="!isFetching && consumers && consumers.length === 0">
            <span>No consumers found</span>
        </div>
        <div class="table-responsive" v-if="consumers && consumers.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('lastName')"><span>Last Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('firstName')"><span>First Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('patranimicName')"><span>Patranimic Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('phoneNumber')"><span>Phone Number</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('email')"><span>Email</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('photo')"><span>Photo</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="consumer in consumers"
                    :key="consumer.id">
                    <td>
                        <router-link :to="{name: 'ConsumerView', params: {consumerId: consumer.id}}">{{consumer.id}}</router-link>
                    </td>
                    <td>{{consumer.lastName}}</td>
                    <td>{{consumer.firstName}}</td>
                    <td>{{consumer.patranimicName}}</td>
                    <td>{{consumer.phoneNumber}}</td>
                    <td>{{consumer.email}}</td>
                    <td>
                        <a v-if="consumer.photo" v-on:click="openFile(consumer.photoContentType, consumer.photo)">
                            <img v-bind:src="'data:' + consumer.photoContentType + ';base64,' + consumer.photo" style="max-height: 30px;" alt="consumer image"/>
                        </a>
                        <span v-if="consumer.photo">{{consumer.photoContentType}}, {{byteSize(consumer.photo)}}</span>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ConsumerView', params: {consumerId: consumer.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'ConsumerEdit', params: {consumerId: consumer.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(consumer)"
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
            <span slot="modal-title"><span id="jhipsterProjectApp.consumer.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-consumer-heading" >Are you sure you want to delete this Consumer?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-consumer" v-on:click="removeConsumer()">Delete</button>
            </div>
        </b-modal>
        <div v-show="consumers && consumers.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./consumer.component.ts">
</script>
