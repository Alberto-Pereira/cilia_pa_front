<template>
  <div class="index">
    <div class="row text-center mt-2">
      <div class="col-md-6 offset-md-3">
        <h1><strong>Welcome!</strong></h1>
        <p>Choose one option below:</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 offset-md-3">
        <router-link to="/clients" class="btn btn-info w-100 mb-3 fw-bold">Clients</router-link>
        <router-link to="/products" class="btn btn-info w-100 mb-3 fw-bold">Products</router-link>
        <router-link to="/sales" class="btn btn-info w-100 mb-3 fw-bold">Sales</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeIndex'
}
</script>