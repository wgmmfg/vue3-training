<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">ADMIN</router-link>
      <button class="navbar-toggler" type="button"
        data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">Front</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/order">Orders</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <button @click="logout" class="btn btn-link nav-link">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api)
        .then((res) => {
          console.log(res);
          this.$router.push('/');
        }).catch((error) => {
          alert(error.data.message);
        });
    },
  },
};
</script>
