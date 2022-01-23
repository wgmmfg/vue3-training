import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const apiBase = 'https://vue3-course-api.hexschool.io/v2/api'
const apiPath = apiBase+'/ying0622';

createApp({
  data() {
    return {
      products: [],
      curProduct: {}
    }
  },
  mounted() {
    //check token if logged-in
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkIfLogin();
  },
  methods: {
    checkIfLogin() {
      axios.post(apiBase+'/user/check')
        .then((res) => {
          // console.log(res);
          this.getProducts();
        })
        .catch((error) => {
          // console.log(error);
          alert(error.data.message);
          window.location='index.html'
        })
    },
    getProducts() {
      axios.get(apiPath+'/admin/products')
        .then((res) => {
          // console.log(res);
          this.products = res.data.products;
        })
        .catch((error) => {
          console.log(error);
          alert(error.data.message)
        })
    }
  },
}).mount('#app');