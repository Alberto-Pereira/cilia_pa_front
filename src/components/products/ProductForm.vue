<template>
  <div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel">{{ productForm.modalTitle }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="productForm.operation == 'show'" class="input-group mb-2">
              <span class="input-group-text fw-bold">ID</span>
              <input type="text" class="form-control" :value="productForm.product.id" disabled>
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Name</span>
              <input v-if="productForm.operation == 'show'" type="text" class="form-control"
                :value="productForm.product.name" disabled>
              <input v-if="productForm.operation == 'edit' || productForm.operation == 'create'" type="text"
                class="form-control" v-model="name">
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Description</span>
              <input v-if="productForm.operation == 'show'" type="text" class="form-control"
                :value="productForm.product.description" disabled>
              <input v-if="productForm.operation == 'edit' || productForm.operation == 'create'" type="text"
                class="form-control" v-model="description">
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Price</span>
              <input v-if="productForm.operation == 'show'" type="number" class="form-control"
                :value="productForm.product.price" disabled>
              <input v-if="productForm.operation == 'edit' || productForm.operation == 'create'" type="number"
                class="form-control" step=".01" v-model="price">
            </div>
            <div v-if="productForm.operation == 'show'" class="input-group mb-2">
              <span class="input-group-text">Created at</span>
              <input type="text" class="form-control" :value="momentComplex(productForm.product.created_at)" disabled>
            </div>
            <div v-if="productForm.operation == 'show'" class="input-group mb-3">
              <span class="input-group-text">Updated at</span>
              <input type="text" class="form-control" :value="momentComplex(productForm.product.updated_at)" disabled>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-if="productForm.operation == 'edit' || productForm.operation == 'create'" type="button"
              class="btn btn-success" v-on:click="productForm.operation == 'edit' ? updateProduct()
              : productForm.operation == 'create' ? postProduct() : ''">
              {{ productForm.operation == 'edit' ? 'Update'
                  : productForm.operation == 'create' ? 'Create' : ''
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
      description: '',
      price: '',
    }
  },
  props: ['productForm'],
  watch: {
    productForm: {
      deep: true,
      handler: function (newVal) {
        this.name = newVal.product.name
        this.description = newVal.product.description
        this.price = newVal.product.price
      }
    }
  },
  methods: {
    postProduct() {
      if (!this.validateProductName() || !this.validateProductDescription() || !this.validateProductPrice()) {
        this.toast.error(`Check product fields values and try again!`)
        return false
      }

      const product = { name: this.name, description: this.description, price: this.price }
      api.post('/products', product)
        .then(() => {
          this.toast.success(`Product created!`)
          setTimeout(() => this.$router.go(), 1000)
        })
        .catch(() => {
          this.toast.error("There was an error when tryed to create the product!");
        });
    },
    updateProduct() {
      if (!this.validateProductName() || !this.validateProductDescription() || !this.validateProductPrice()) {
        this.toast.error(`Check product fields values and try again!`)
        return false
      }

      const product = { name: this.name, description: this.description, price: this.price }
      api.put('/products/' + this.productForm.product.id, product)
        .then(() => {
          this.toast.success(`Product updated!`)
          setTimeout(() => this.$router.go(), 1000)
        })
        .catch(() => {
          this.toast.error("There was an error when tryed to update the product!")
        });
    },
    validateProductName() {
      // Validate name - Must be string and more then 1 character
      if (this.name == undefined || this.name == '') {
        this.toast.warning(`Product name can't be empty!`)
        return false
      }

      if (this.name.length <= 1) {
        this.toast.warning(`Product name can't be less or equal to 1 character!`)
        return false
      }

      return true
    },
    validateProductDescription() {
      // Validate description - If exists must be string and more then 1 character
      if (this.description != undefined && this.description != '') {
        try {
          if (this.description.length <= 1) {
            this.toast.warning(`If product has description then can't be less or equal to 1 character!`)
            return false
          }
        } catch (e) {
          this.toast.warning(`Invalid product price`)
          return false
        }
      }

      return true
    },
    validateProductPrice() {
      // Validate price - Must be greater then 0,00
      if (this.price == undefined || this.price == '') {
        this.toast.warning(`Product price can't be empty or less then 0!`)
        return false
      }

      if (parseFloat(this.price) <= 0.00) {
        this.toast.warning(`Product price must be greater then 0,00`)
        return false
      }

      return true
    },
    momentComplex(date) {
      return moment(date).format('DD/MM/YYYY hh:mm:ss a')
    }
  }
}
</script>