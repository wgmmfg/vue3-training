import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const apiBase = 'https://vue3-course-api.hexschool.io/v2/api'
const apiPath = apiBase+'/ying0622';

let productModal, delProductModal;

createApp({
  data() {
    return {
      products: [],
      curProduct: {
        imagesUrl:[]
      },
      editStatus:''
    }
  },
  mounted() {
    //check token if logged-in
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkIfLogin();
    
    delProductModal = new bootstrap.Modal(this.$refs.delProductModal, {
      // keyboard: false
    });
    productModal = new bootstrap.Modal(this.$refs.productModal, {
      // keyboard: false
    });
    this.$refs.productModal.addEventListener('hidden.bs.modal', (event) => {
      // console.log(event);
      this.curProduct = {
        imagesUrl: []
      };
      this.editStatus = '';
    });
    this.$refs.delProductModal.addEventListener('hidden.bs.modal', (event) => {
      // console.log(event);
      this.curProduct = {
        imagesUrl: []
      };
      this.editStatus = '';
    });
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
          window.location='login.html'
        })
    },
    getProducts() {
      this.products = [];
      axios.get(apiPath+'/admin/products')
        .then((res) => {
          // console.log(res);
          this.products = res.data.products;
        })
        .catch((error) => {
          console.log(error);
          alert(error.data.message)
        })
    },
    addImages() {
      this.curProduct.imagesUrl = [];
      this.curProduct.imagesUrl.push('')
    },
    addItem() {
      // const {data} = this.curProduct;
      axios.post(apiPath + '/admin/product', {data:this.curProduct})
        .then(res => {
          console.log(res);
          alert(res.data.message);
          productModal.hide();
          this.getProducts();
        })
        .catch(error => {
          console.log(error);
          alert(error.data.message);
        })
    },
    editItem(item) {
      // console.log('edit: ', item, item.id);
      this.curProduct = JSON.parse(JSON.stringify(item));
      this.editStatus = 'edit';
    },
    updateItem() {
      let data = this.curProduct;
      if(this.editStatus == 'edit') {
        // console.log(this.curProduct);
        axios.put(`${apiPath}/admin/product/${this.curProduct.id}`, {data})
          .then(res => {
            // console.log(res);
            alert(res.data.message);
            productModal.hide();
            this.getProducts();
          })
          .catch(error => {
            console.log(error);
            alert(error.data.message);
          })
      } else {
        this.addItem();
      }
    },
    deleteItem() {
      this.editStatus = 'deleting';
      axios.delete(apiPath+'/admin/product/'+this.curProduct.id)
        .then(res=> {
          console.log(res);
          alert(res.data.message);
          delProductModal.hide();
          this.getProducts();
          this.editStatus = '';
        })
        .catch(error => {
          console.log(error);
          alert(error.data.message);
        });
    },
  },
}).mount('#app');