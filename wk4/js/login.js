import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      msg: ''
    }
  },
  methods:{
    checkLogin() {
      const loginapi = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      this.msg = '';
      axios.post(loginapi, this.user)
        .then(res => {
          console.log(res);
          const { token, expired } = res.data;
          document.cookie = `token=${token};expires=${new Date(expired)}; path=/`;
          window.location = 'products.html';
        })
        .catch(error => {
          // console.log(error);
          this.msg = error.data.message;
        })
    }
  },
}).mount('#app');
