<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="consumer">
                <h2 class="jh-entity-heading"><span>Consumer</span> {{consumer.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Last Name</span>
                    </dt>
                    <dd>
                        <span>{{consumer.lastName}}</span>
                    </dd>
                    <dt>
                        <span>First Name</span>
                    </dt>
                    <dd>
                        <span>{{consumer.firstName}}</span>
                    </dd>
                    <dt>
                        <span>Patranimic Name</span>
                    </dt>
                    <dd>
                        <span>{{consumer.patranimicName}}</span>
                    </dd>
                    <dt>
                        <span>Phone Number</span>
                    </dt>
                    <dd>
                        <span>{{consumer.phoneNumber}}</span>
                    </dd>
                    <dt>
                        <span>Email</span>
                    </dt>
                    <dd>
                        <span>{{consumer.email}}</span>
                    </dd>
                    <dt>
                        <span>Photo</span>
                    </dt>
                    <dd>
                        <div v-if="consumer.photo">
                            <a v-on:click="openFile(consumer.photoContentType, consumer.photo)">
                                <img v-bind:src="'data:' + consumer.photoContentType + ';base64,' + consumer.photo" style="max-width: 100%;" alt="consumer image"/>
                            </a>
                            {{consumer.photoContentType}}, {{byteSize(consumer.photo)}}
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="consumer.id" :to="{name: 'ConsumerEdit', params: {consumerId: consumer.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./consumer-details.component.ts">
</script>
