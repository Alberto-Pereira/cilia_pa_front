<template>
  <div>
    <div class="modal fade" id="saleEditForm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Sale</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="col-md-10 offset-md-1">
              <v-select :options="clients" label="name" placeholder="Client" v-model="preparedSale.client">
                <template v-slot:option="client">
                  {{ client.id + ' | ' + client.name + ' | ' + client.email }}
                </template>
              </v-select>
              <div class="mt-3"></div>
              <hr>
              <v-select :options="products" label="name" class="mb-3" placeholder="Product"
                v-model="preparedSale.product">
                <template v-slot:option="product">
                  {{ product.id + ' | ' + product.name + ' | R$ ' + product.price }}
                </template>
              </v-select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-on:click="putSale()" type="button" class="btn btn-success">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast()

    return { toast }
  },
  props: ['saleForm'],
  watch: {
    saleForm: {
      deep: true,
      handler: function (newVal) {
        this.preparedSale.client = newVal.sale.client
        this.preparedSale.product = newVal.sale.product
      }
    }
  },
  data() {
    return {
      clients: '',
      products: '',
      preparedSale: {
        client: '',
        product: '',
      },
      sale: {
        client_id: '',
        product_id: '',
      }
    }
  },
  mounted() {
    api.get('/clients')
      .then(response => {
        this.clients = response.data
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.log("There was an error when tryed to get clients!", error);
      })

    api.get('/products')
      .then(response => {
        this.products = response.data
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.log("There was an error when tryed to get products!", error);
      })
  },
  components: {
    'v-select': vSelect
  },
  methods: {
    putSale() {
      if (this.prepareSale() == undefined || this.prepareSale() == null) {
        this.toast.error('Check sale fields and try again!')
        return 
      }

      api.put('/sales/' + this.saleForm.sale.id, this.sale)
        .then(response => {
          this.toast.success(`Sale updated!`)
          setTimeout(() => { this.$router.go() }, 1500)
        })
        .catch(error => {
          this.toast.error('Error when try to update sale ', error)
        })
    },
    prepareSale() {
      try {
        this.sale.client_id = this.preparedSale.client.id
      } catch (error) {
        this.sale.client_id = -1
        this.toast.warning("This client doesn't exist!")
        return
      }

      try {
        this.sale.product_id = this.preparedSale.product.id
      } catch (error) {
        this.sale.product_id = -1
        this.toast.warning("This product doesn't exist!")
        return
      }

      return this.sale
    }
  }
}
</script>