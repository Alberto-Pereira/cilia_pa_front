<template>
  <div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel">{{ saleForm.modalTitle }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-2">
              <span class="input-group-text fw-bold">Sale ID</span>
              <input type="text" class="form-control" :value="saleForm.sale.id" disabled>
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text fw-bold">Client ID</span>
              <input type="text" class="form-control" :value="client.id" disabled>
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Client name</span>
              <input type="text" class="form-control" :value="client.name" disabled>
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Client email</span>
              <input type="text" class="form-control" :value="client.email" disabled>
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text fw-bold">Product ID</span>
              <input type="text" class="form-control" :value="product.id" disabled>
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Product name</span>
              <input type="text" class="form-control" :value="product.name" disabled>
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Product price</span>
              <input type="text" class="form-control" :value="product.price" disabled>
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text ">Created at</span>
              <input type="text" class="form-control" :value="momentComplex(saleForm.sale.created_at)" disabled>
            </div>
            <div class="input-group mb-2">
              <span class="input-group-text">Updated at</span>
              <input type="text" class="form-control" :value="momentComplex(saleForm.sale.updated_at)" disabled>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      client: '',
      product: ''
    }
  },
  props: ['saleForm'],
  watch: {
    saleForm: {
      deep: true,
      handler: function (newVal) {
        this.client = newVal.sale.client
        this.product = newVal.sale.product
      }
    }
  },
  methods: {
    momentComplex(date) {
      return moment(date).format('DD/MM/YYYY hh:mm:ss a')
    }
  }
}
</script>