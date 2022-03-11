<template>
  <div>
    <div class="container py-5">
      <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
      <div class="row justify-content-center">
        <div class="col-8">
          <form id="form" class="form-signin" @submit.prevent="checkLogin">
            <div v-if="msg" class="alert alert-warning" role="alert">
              {{ msg }}
            </div>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                v-model="user.username"
              />
            <!-- eslint-disable -->
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
                v-model="user.password"
              />
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </form>
        </div>
      </div>
      <!-- <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      msg: '',
    };
  },
  mounted() {},
  methods: {
    checkLogin() {
      const loginapi = `${process.env.VUE_APP_API}admin/signin`;
      this.msg = '';
      this.$http
        .post(loginapi, this.user)
        .then((res) => {
          console.log(res);
          const { token, expired } = res.data;
          document.cookie = `token=${token};expires=${new Date(expired)}; path=/`;
          this.$router.push('/admin/products');
        })
        .catch((error) => {
          // console.log(error);
          this.msg = error.data.message;
        });
    },
  },
};
</script>
