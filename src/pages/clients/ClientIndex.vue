<template>
  <div>
    <h1 class="text-center mb-3 mt-3 strong">Clients</h1>
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <table class="table table-striped table-hover table-bordered">
          <thead>
            <tr class="text-center">
              <th class="col-md-1">ID</th>
              <th class="col-md-3">Name</th>
              <th class="col-md-3">Email</th>
              <th class="col-md-3">Birth date</th>
              <th colspan="2" class="col-md-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(client) in clients" :key="client.id" class="text-center align-middle">
              <td>{{ client.id }}</td>
              <td>{{ client.name }}</td>
              <td>{{ client.email }}</td>
              <td>{{ moment(client.birth_date) }}</td>
              <td class="text-center">
                <button class="btn btn-info me-2" v-on:click="setClientForm('Client', client, 'show')"
                  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show</button>
                <button class="btn btn-warning me-2" v-on:click="setClientForm('Edit Client', client, 'edit')"
                  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                <button class="btn btn-danger" v-on:click="setDestroyClient('Destroy Client?', client, 'client')"
                  data-bs-toggle="modal" data-bs-target="#destroyModal">Destroy</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-success me-2 float-end" v-on:click="setClientForm('New Client', '', 'create')"
          data-bs-toggle="modal" data-bs-target="#staticBackdrop">New Client</button>
        <router-link to="/" class="btn btn-secondary float-start">Back</router-link>
      </div>
    </div>
    <client-form :clientForm="clientForm"></client-form>
    <destroy-modal :destroyModel="destroyClient"></destroy-modal>
  </div>
</template>

<script>
import api from '@/services/api'

import moment from 'moment'

import ClientForm from '@/components/clients/ClientForm.vue'
import DestroyModal from '@/components/util/DestroyModal.vue'

export default {
  name: 'ClientIndex',
  data() {
    return {
      clients: [],
      clientForm: {
        modalTitle: '',
        client: '',
        operation: '',
      },
      destroyClient: {
        modalTitle: '',
        client: '',
        entity: '',
      }
    }
  },
  methods: {
    setClientForm(modalTitle, client, operation) {
      this.clientForm.modalTitle = modalTitle
      this.clientForm.client = client
      this.clientForm.operation = operation
    },
    setDestroyClient(modalTitle, client, entity) {
      this.destroyClient.modalTitle = modalTitle
      this.destroyClient.client = client
      this.destroyClient.entity = entity
    },
    moment(date) {
      return moment(date).isValid() ? moment(date).format('DD/MM/YYYY') : '';
    }
  },
  mounted() {
    api.get('/clients')
      .then(response => {
        this.clients = response.data
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.log(`There was an error when tryed to get clients! ${errorMessage}`);
      })
  },
  components: {
    'client-form': ClientForm,
    'destroy-modal': DestroyModal
  }
}
</script>