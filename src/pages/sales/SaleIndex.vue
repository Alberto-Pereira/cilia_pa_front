<template>
  <div>
    <h1 class="text-center mb-3 mt-3 strong">Sales</h1>
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <table class="table table-striped table-hover table-bordered">
          <thead>
            <tr class="text-center">
              <th class="col-md-1">ID</th>
              <th class="col-md-2">Client</th>
              <th class="col-md-3">Email</th>
              <th class="col-md-3">Product</th>
              <th class="col-md-1">Price</th>
              <th colspan="3" class="col-md-2">Action</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="sale in sales" :key="sale.id" class="text-center align-middle">
                <td>{{ sale.id}}</td>
                <td>{{ sale.client.name }}</td>
                <td>{{ sale.client.email }}</td>
                <td>{{ sale.product.name }}</td>
                <td>{{ sale.product.price }}</td>
                <td class="text-center">
                  <button class="btn btn-info me-2" 
                    v-on:click="setSaleForm('Sale', sale, 'show')" 
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show</button>
                  <button class="btn btn-warning me-2" 
                    v-on:click="setSaleForm('Sale', sale, 'edit')" 
                    data-bs-toggle="modal" data-bs-target="#saleEditForm">Edit</button>
                  <button class="btn btn-danger"
                    v-on:click="setDestroySale('Destroy Sale?', sale, 'sale')" 
                    data-bs-toggle="modal" data-bs-target="#destroyModal">Destroy</button>
                </td>
              </tr>
          </tbody>
        </table>
        <button class="btn btn-success me-2 float-end" data-bs-toggle="modal" data-bs-target="#saleNewForm">New Sale</button>
        <router-link to="/" class="btn btn-secondary float-start">Back</router-link>
      </div>
    </div>
    <sale-form :saleForm="saleForm"></sale-form>
    <sale-new-form></sale-new-form>
    <sale-edit-form :saleForm="saleForm"></sale-edit-form>
    <destroy-modal :destroyModel="destroySale"></destroy-modal>
  </div>
</template>

<script>
import api from '@/services/api'

import SaleForm from '@/components/sales/SaleForm.vue'
import SaleNewForm from '@/components/sales/SaleNewForm.vue'
import SaleEditForm from '@/components/sales/SaleEditForm.vue'

import DestroyModal from '@/components/util/DestroyModal.vue'

export default {
    name:'SaleIndex',
    data(){
      return {
        sales: [],
        saleForm: {
          modalTitle: '',
          sale: '',
          operation: '',
        },
        destroySale: {
          modalTitle: '',
          sale: '',
          entity: '',
        }
      }
    },
    methods: {
      setSaleForm(modalTitle, sale, operation){
        this.saleForm.modalTitle = modalTitle
        this.saleForm.sale = sale
        this.saleForm.operation = operation
      },
      setDestroySale(modalTitle, sale, entity){
        this.destroySale.modalTitle = modalTitle
        this.destroySale.sale = sale
        this.destroySale.entity = entity
      }   
    },
    mounted(){
      api.get('/sales')
      .then(response => {
        this.sales = response.data
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.log(`There was an error when tryed to get sales! ${errorMessage}`);
      })
    },
    components: {
      'sale-form': SaleForm,
      'sale-new-form': SaleNewForm,
      'sale-edit-form': SaleEditForm,
      'destroy-modal': DestroyModal
    } 
}
</script>

<style scoped>

</style>