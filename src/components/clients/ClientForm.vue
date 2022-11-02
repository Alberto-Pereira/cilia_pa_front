<template>
  <div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel">{{ clientForm.modalTitle }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="clientForm.operation == 'show'" class="input-group mb-2">
              <span class="input-group-text fw-bold">ID</span>
              <input type="text" class="form-control" :value="clientForm.client.id" disabled>
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Name</span>
              <input v-if="clientForm.operation == 'show'" type="text" class="form-control"
                :value="clientForm.client.name" disabled>
              <input v-if="clientForm.operation == 'edit' || clientForm.operation == 'create'" type="text"
                class="form-control" v-model="name" v-on:blur="validateClientName()">
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Email</span>
              <input v-if="clientForm.operation == 'show'" type="text" class="form-control"
                :value="clientForm.client.email" disabled>
              <input v-if="clientForm.operation == 'edit' || clientForm.operation == 'create'" type="text"
                class="form-control" v-model="email">
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Birth date</span>
              <input v-if="clientForm.operation == 'show'" type="text" class="form-control"
                :value="moment(clientForm.client.birth_date)" disabled>
              <input v-if="clientForm.operation == 'edit' || clientForm.operation == 'create'" type="date"
                class="form-control" v-model="birth_date">
            </div>
            <div v-if="clientForm.operation == 'show'" class="input-group mb-2">
              <span class="input-group-text">Created at</span>
              <input type="text" class="form-control" :value="momentComplex(clientForm.client.created_at)" disabled>
            </div>
            <div v-if="clientForm.operation == 'show'" class="input-group mb-3">
              <span class="input-group-text">Updated at</span>
              <input type="text" class="form-control" :value="momentComplex(clientForm.client.updated_at)" disabled>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-if="clientForm.operation == 'edit' || clientForm.operation == 'create'" type="button"
              class="btn btn-success" v-on:click="clientForm.operation == 'edit' ? updateClient()
              : clientForm.operation == 'create' ? postClient() : ''">
              {{ clientForm.operation == 'edit' ? 'Update'
                  : clientForm.operation == 'create' ? 'Create' : ''
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

import moment from 'moment'
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast()

    return { toast }
  },
  data() {
    return {
      name: '',
      email: '',
      birth_date: '',
    }
  },
  props: ['clientForm'],
  watch: {
    clientForm: {
      deep: true,
      handler: function (newVal) {
        this.name = newVal.client.name
        this.email = newVal.client.email
        this.birth_date = newVal.client.birth_date
      }
    }
  },
  methods: {
    postClient() {
      if (!this.validateClientName() || !this.validateClientEmail() || !this.validateClientBirthDate()) {
        this.toast.error(`Check client fields values and try again!`)
        return false
      }

      const client = { name: this.name, email: this.email, birth_date: this.birth_date };
      api.post('/clients', client)
        .then(() => {
          this.toast.success(`Client created!`)
          setTimeout(() => this.$router.go(), 1000)
        })
        .catch(() => {
          this.toast.error("There was an error when tryed to create the client!");
        });
    },
    updateClient() {
      if (!this.validateClientName() || !this.validateClientEmail() || !this.validateClientBirthDate()) {
        this.toast.error(`Check client fields values and try again!`)
        return false
      }

      const client = { name: this.name, email: this.email, birth_date: this.birth_date }
      api.put('/clients/' + this.clientForm.client.id, client)
        .then(() => {
          this.toast.success(`Client updated!`)
          setTimeout(() => this.$router.go(), 1000)
        })
        .catch(() => {
          this.toast.error("There was an error when tryed to update the client!")
        });
    },
    validateClientName() {
      // Validate name - Must be string and more then 3 characters
      if (this.name == undefined || this.name == '') {
        this.toast.warning(`Client name can't be empty!`)
        return false
      }

      const regex = new RegExp('([A-zãõ]+)', 'g');
      if (regex.test(this.name)) {
        this.name = this.name.match(regex).toString().replaceAll(',', ' ')

        if (this.name.replaceAll(' ', '').length <= 3) {
          this.toast.warning(`Client name must be more then 3 characters!`)
          return false
        }

        return true
      }

      this.toast.warning(`Invalid client name!`)
      return false
    },
    validateClientEmail() {
      // Validate email - Must be example@email.com or example@email.com.br 
      if (this.email == undefined || this.email == '') {
        this.toast.warning(`Client email can't be empty!`)
        return false
      }

      const regex = new RegExp('^[a-z0-9\_]{1,}@{1}[a-z]{1,}[\.]{1}[a-z]{1,}[\.]{0,1}[a-z]{1,}$');
      if (!regex.test(this.email)) {
        this.toast.warning(`Invalid client email!`)
        return false
      }

      return true
    },
    validateClientBirthDate() {
      // Valid birth_date - If exists must be less then 2020
      if (!moment(this.birth_date).isValid() && this.birth_date != '') {
        this.toast.warning(`Invalid client birth date format!`)
        return false
      }

      if ((moment(this.birth_date).year() > 2020 || moment(this.birth_date).year() < 1900) && this.birth_date != undefined && this.birth_date != '') {
        this.toast.warning(`Invalid client birth date year! Must be less then 2021`)
        return false
      }

      return true
    },
    moment(date) {
      return moment(date).isValid() ? moment(date).format('DD/MM/YYYY') : '';
    },
    momentComplex(date) {
      return moment(date).format('DD/MM/YYYY hh:mm:ss a')
    }
  }
}
</script>