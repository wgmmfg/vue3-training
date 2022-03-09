import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import pager from './components/pager.js';
import modal from './components/productModal.js';
import delModal from './components/delModal.js';


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
      editStatus:'',
      pagination: {},
    }
  },
  mounted() {
    //check token if logged-in
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkIfLogin();
    
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    document.getElementById('productModal').addEventListener('hidden.bs.modal', (event) => {
      this.resetData();
    });
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    document.getElementById('delProductModal').addEventListener('hidden.bs.modal', (event) => {
      this.resetData();
    });
  },
  components:{
    pager,
    modal,
    delModal,
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
    getProducts(page = 1) {
      this.products = [];
      axios.get(apiPath+'/admin/products?page='+page)
        .then((res) => {
          // console.log(res);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
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
      axios.post(apiPath + '/admin/product', {data:this.curProduct})
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
          // console.log(res);
          alert(res.data.message);
          delProductModal.hide();
          this.getProducts();
          this.resetData();
        })
        .catch(error => {
          console.log(error);
          alert(error.data.message);
        });
    },
    resetData() {
      this.curProduct = {
        imagesUrl: []
      };
      this.editStatus = '';
    }
  },
}).mount('#app');