<template>
  <nav class="navbar fixed-top navbar-expand-lg bg-info">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand fw-bold">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/clients" class="nav-link welcome-nav-link">Clients</router-link>
          <router-link to="/products" class="nav-link welcome-nav-link">Products</router-link>
          <router-link to="/sales" class="nav-link welcome-nav-link">Sales</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>
.welcome-nav-link {
  color: black !important;
}
</style>