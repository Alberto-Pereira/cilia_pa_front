<template>
  <div>
    <div class="modal fade" id="saleNewForm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New Sale</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="col-md-10 offset-md-1">
              <v-select :options="clients" label="name" placeholder="Client" v-model="newSale.client">
                <template v-slot:option="client">
                  {{ client.id + ' | ' + client.name + ' | ' + client.email }}
                </template>
              </v-select>
              {{ newSale.client }}
              <div class="mt-3"></div>
              <hr>
              <v-select v-for="index in productQuantity" :key="index" :options="products" label="name" class="mb-3"
                placeholder="Product" v-model="newSale.products[index - 1]">
                <template v-slot:option="product">
                  {{ product.id + ' | ' + product.name + ' | R$ ' + product.price }}
                </template>
              </v-select>
              {{ newSale.products }}
              <button class="btn btn-danger float-end ms-2" v-on:click="removeProduct()">Remove</button>
              <button class="btn btn-success float-end" v-on:click="addProduct()">Add</button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-on:click="postSale()" type="button" class="btn btn-success">Create</button>
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
  data() {
    return {
      clients: '',
      products: '',
      productQuantity: 1,
      newSale: {
        client: '',
        products: [],
      },
      preparedSale: {
        client_id: '',
        products_id: []
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
        console.log(`There was an error when tryed to get clients! ${errorMessage}`);
      })

    api.get('/products')
      .then(response => {
        this.products = response.data
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.log(`There was an error when tryed to get products! ${errorMessage}`);
      })
  },
  components: {
    'v-select': vSelect
  },
  methods: {
    postSale() {
      if (this.prepareSale() == undefined || this.prepareSale() == null) {
        this.toast.error('Check sale fields and try again!')
        return
      }

      const preparedSale = this.prepareSale()
      preparedSale.products_id.forEach((value, index) => {
        this.sale.client_id = this.prepareSale().client_id
        this.sale.product_id = value

        api.post('/sales', this.sale)
          .then(() => {
            this.toast.info(`Registred product | Product: ${this.newSale.products[index].name}`)
          })
          .catch(() => {
            this.toast.error(`Error when try to create sale | Fail product: ${this.newSale.products[index].name}`)
          })
      })

      setTimeout(() => {
        this.$router.go()
      }, 2000)
    },
    prepareSale() {
      try {
        this.preparedSale.client_id = this.newSale.client.id
      } catch (error) {
        this.preparedSale.client_id = -1
        this.toast.warning("This client doesn't exist!")
        return
      }

      this.preparedSale.client_id == undefined ? this.preparedSale.client_id = -1 : ''

      try {
        this.preparedSale.products_id = this.newSale.products.map(value => {
          return value.id
        })
      } catch (error) {
        this.preparedSale.products_id = 0
        this.toast.warning("This product doesn't exist!")
        return
      }

      if (this.preparedSale.products_id.length <= 0) {
        return
      }

      return this.preparedSale
    },
    addProduct() {
      if (this.productQuantity >= 10) {
        return
      }

      if (this.newSale.products[this.newSale.products.length - 1] != null) {
        this.productQuantity++
        this.newSale.products[this.newSale.products.length] = null
      }
    },
    removeProduct() {
      if (this.productQuantity <= 1) {
        this.productQuantity = 1
        return
      }
      this.productQuantity--;
      this.newSale.products.pop()
    },
  }
}
</script>