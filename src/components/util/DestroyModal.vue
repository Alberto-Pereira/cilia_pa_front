<template>
  <div>
    <div class="modal fade" id="destroyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ destroyModel.modalTitle }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <!-- CLIENT -->
            <div v-if="destroyModel.entity == 'client'">
              <div class="input-group mb-2">
                <span class="input-group-text">Name</span>
                <input type="text" class="form-control" :value="destroyModel.client.name" disabled>
              </div>
              <div class="input-group">
                <span class="input-group-text">Email</span>
                <input type="text" class="form-control" :value="destroyModel.client.email" disabled>
              </div>
            </div>

            <!-- PRODUCT -->
            <div v-if="destroyModel.entity == 'product'">
              <div class="input-group mb-2">
                <span class="input-group-text">Name</span>
                <input type="text" class="form-control" :value="destroyModel.product.name" disabled>
              </div>
              <div class="input-group">
                <span class="input-group-text">Price</span>
                <input type="text" class="form-control" :value="destroyModel.product.price" disabled>
              </div>
            </div>

            <!-- SALE -->
            <div v-if="destroyModel.entity == 'sale'">
              <div class="input-group mb-2">
                <span class="input-group-text">Sale ID</span>
                <input type="text" class="form-control" :value="destroyModel.sale.id" disabled>
              </div>
              <div class="input-group mb-2">
                <span class="input-group-text">Sale Client</span>
                <input type="text" class="form-control" :value="destroyModel.sale.client.name" disabled>
              </div>
              <div class="input-group">
                <span class="input-group-text">Sale Product</span>
                <input type="text" class="form-control" :value="destroyModel.sale.product.name" disabled>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-on:click="destroyModel.entity == 'client' ? destroyClient()
          : destroyModel.entity == 'product' ? destroyProduct()
            : destroyModel.entity == 'sale' ? destroySale() : ''" type="button"
              class="btn btn-danger">Destroy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast()

    return { toast }
  },
  props: [
    'destroyModel'
  ],
  methods: {
    destroyClient() {
      api.delete('/clients/' + this.destroyModel.client.id)
        .then(() => {
          this.toast.success(`Client destroyed!`)
          setTimeout(() => this.$router.go(), 1000)
        })
        .catch(() => {
          this.toast.error(`Failed to destroy client!`)
        })
    },
    destroyProduct() {
      api.delete('/products/' + this.destroyModel.product.id)
        .then(() => {
          this.toast.success(`Product destroyed!`)
          setTimeout(() => this.$router.go(), 1000)
        })
        .catch(() => {
          this.toast.error(`Failed to destroy product!`)
        })
    },
    destroySale() {
      api.delete('/sales/' + this.destroyModel.sale.id)
        .then(() => {
          this.toast.success(`Sale destroyed!`)
          setTimeout(() => this.$router.go(), 1000)
        })
        .catch(() => {
          this.toast.error(`Failed to destroy sale!`)
        })
    }
  }
}
</script>