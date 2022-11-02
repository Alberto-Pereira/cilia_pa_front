<template>
  <div>
    <h1 class="text-center mb-3 mt-3 strong">Products</h1>
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <table class="table table-striped table-hover table-bordered">
          <thead>
            <tr class="text-center">
              <th class="col-md-1">ID</th>
              <th class="col-md-2">Name</th>
              <th class="col-md-6">Description</th>
              <th class="col-md-1">Price</th>
              <th colspan="3" class="col-md-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" class="text-center align-middle">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
              <td class="text-center">
                <button class="btn btn-info me-2" v-on:click="setProductForm('Product', product, 'show')"
                  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show</button>
                <button class="btn btn-warning me-2" v-on:click="setProductForm('Edit Product', product, 'edit')"
                  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                <button class="btn btn-danger" v-on:click="setDestroyProduct('Destroy Product?', product, 'product')"
                  data-bs-toggle="modal" data-bs-target="#destroyModal">Destroy</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-success me-2 float-end" v-on:click="setProductForm('New Product', '', 'create')"
          data-bs-toggle="modal" data-bs-target="#staticBackdrop">New Product</button>
        <router-link to="/" class="btn btn-secondary float-start">Back</router-link>
      </div>
    </div>
    <product-form :productForm="productForm"></product-form>
    <destroy-modal :destroyModel="destroyProduct"></destroy-modal>
  </div>
</template>

<script>
import api from '@/services/api';

import ProductForm from '@/components/products/ProductForm.vue'

import DestroyModal from '@/components/util/DestroyModal.vue'

export default {
  name: 'ProductIndex',
  data() {
    return {
      products: [],
      productForm: {
        modalTitle: '',
        product: '',
        operation: '',
      },
      destroyProduct: {
        modalTitle: '',
        product: '',
        entity: '',
      }
    }
  },
  methods: {
    setProductForm(modalTitle, product, operation) {
      this.productForm.modalTitle = modalTitle
      this.productForm.product = product
      this.productForm.operation = operation
    },
    setDestroyProduct(modalTitle, product, entity) {
      this.destroyProduct.modalTitle = modalTitle
      this.destroyProduct.product = product
      this.destroyProduct.entity = entity
    }
  },
  mounted() {
    api.get('/products')
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.log(`There was an error when tryed to get products! ${errorMessage}`);
      })
  },
  components: {
    'product-form': ProductForm,
    'destroy-modal': DestroyModal
  }
}
</script>