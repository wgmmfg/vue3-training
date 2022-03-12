<template>
<div>
  <AdminMenu/>
  <router-view></router-view>
</div>
</template>

<script>
import AdminMenu from '@/components/AdminMenu.vue';

export default {
  components: {
    AdminMenu,
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    this.$http.post(`${process.env.VUE_APP_API}api/user/check`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        document.cookie = `token=;expires=${new Date()}; path=/`;
        // alert(error.data.message);
        this.$router.push('/');
      });
  },
};
</script>
