<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterProjectApp.consumer.home.createOrEditLabel">Create or edit a Consumer</h2>
                <div>
                    <div class="form-group" v-if="consumer.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="consumer.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="consumer-lastName">Last Name</label>
                        <input type="text" class="form-control" name="lastName" id="consumer-lastName"
                            :class="{'valid': !$v.consumer.lastName.$invalid, 'invalid': $v.consumer.lastName.$invalid }" v-model="$v.consumer.lastName.$model"  required/>
                        <div v-if="$v.consumer.lastName.$anyDirty && $v.consumer.lastName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.consumer.lastName.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="consumer-firstName">First Name</label>
                        <input type="text" class="form-control" name="firstName" id="consumer-firstName"
                            :class="{'valid': !$v.consumer.firstName.$invalid, 'invalid': $v.consumer.firstName.$invalid }" v-model="$v.consumer.firstName.$model"  required/>
                        <div v-if="$v.consumer.firstName.$anyDirty && $v.consumer.firstName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.consumer.firstName.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="consumer-patranimicName">Patranimic Name</label>
                        <input type="text" class="form-control" name="patranimicName" id="consumer-patranimicName"
                            :class="{'valid': !$v.consumer.patranimicName.$invalid, 'invalid': $v.consumer.patranimicName.$invalid }" v-model="$v.consumer.patranimicName.$model"  required/>
                        <div v-if="$v.consumer.patranimicName.$anyDirty && $v.consumer.patranimicName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.consumer.patranimicName.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="consumer-phoneNumber">Phone Number</label>
                        <input type="text" class="form-control" name="phoneNumber" id="consumer-phoneNumber"
                            :class="{'valid': !$v.consumer.phoneNumber.$invalid, 'invalid': $v.consumer.phoneNumber.$invalid }" v-model="$v.consumer.phoneNumber.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="consumer-email">Email</label>
                        <input type="text" class="form-control" name="email" id="consumer-email"
                            :class="{'valid': !$v.consumer.email.$invalid, 'invalid': $v.consumer.email.$invalid }" v-model="$v.consumer.email.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="consumer-photo">Photo</label>
                        <div>
                            <img v-bind:src="'data:' + consumer.photoContentType + ';base64,' + consumer.photo" style="max-height: 100px;" v-if="consumer.photo" alt="consumer image"/>
                            <div v-if="consumer.photo" class="form-text text-danger clearfix">
                                <span class="pull-left">{{consumer.photoContentType}}, {{byteSize(consumer.photo)}}</span>
                                <button type="button" v-on:click="clearInputImage('photo', 'photoContentType', 'file_photo')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_photo" id="file_photo" v-on:change="setFileData($event, consumer, 'photo', true)" accept="image/*"/>
                        </div>
                        <input type="hidden" class="form-control" name="photo" id="consumer-photo"
                            :class="{'valid': !$v.consumer.photo.$invalid, 'invalid': $v.consumer.photo.$invalid }" v-model="$v.consumer.photo.$model" />
                        <input type="hidden" class="form-control" name="photoContentType" id="consumer-photoContentType"
                            v-model="consumer.photoContentType" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.consumer.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./consumer-update.component.ts">
</script>
