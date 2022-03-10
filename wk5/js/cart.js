import pager from "../components/pager.js";
import productInfoModal from "../components/productInfoModal.js";

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;
const apiBase = 'https://vue3-course-api.hexschool.io/v2/api'
const apiPath = apiBase+'/ying0622';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

const app = Vue.createApp({
  data() {
    return {
      products:[],
      curProduct:{},
      pagination: {},
      cart: {
        carts:[],
        total:0,
        final_total:0,
      },
      order:{
        name:'',
        tel:'',
        email:'',
        address:'',
        message:'',
      },
      loadingItem:{
        id:'',
        part:''
      },
    }
  },
  components:{
    pager,
    productInfoModal,
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    resetLoadItem() {
      this.loadingItem = {
        id:'',
        part:'',
      }
    },
    getProducts(page = 1){
      let api = `${apiPath}/products?page=${page}`
      axios.get(api)
      .then((res) => {
        // console.log(res);
        this.products = res.data.products;
        this.pagination = res.data.pagination;
      })
      .catch((error) => {
        console.log(error);
        alert(error.data.message)
      });
    },
    showInfo(pid) {
      this.loadingItem.id = pid;
      this.loadingItem.part = 'view';
      let api = `${apiPath}/product/${pid}`;
      console.log(this.loadingItem);
      axios.get(api).then(res => {
        // console.log(res);
        this.curProduct = res.data.product;
        this.$refs.ProductModal.openModal();
        this.resetLoadItem();
        console.log(this.loadingItem);
      })
      .catch(error=>{
        console.log(error);
        alert(error.data.message);
      });
    },
    onSubmit() {
      let api = `${apiPath}/order`;
      axios.post(api, {data:{
        user: {
          name:this.order.name,
          email:this.order.email,
          tel:this.order.tel,
          address:this.order.address,
        },
        message:this.order.message
      }}).then(res => {
        alert(res.data.message);
        this.$refs.form.resetForm();
        this.getCart();
      })
      .catch(error=>{
        console.log(error);
        alert(error.data.message)
      });
    },
    checkPhone(val) {
      const pattern = /^(09)[0-9]{8}$/;
      return pattern.test(val) ? true : '電話號碼格式不正確(09xxxxxxxx)';
    },
    getCart() {
      let api = `${apiPath}/cart`;
      axios.get(api)
        .then(res => {
          // console.log('cart:: ',res);
          this.cart.carts = res.data.data.carts;
          this.cart.total = res.data.data.total;
          this.cart.final_total = res.data.data.final_total;
        })
        .catch(error => {
          console.log(error);
          alert(error.data.message);
        })
    },
    addToCart(pid,qty=1) {
      this.loadingItem = {
        id: pid,
        part:'addCart'
      }
      this.$refs.ProductModal.hideModal();
      let api = `${apiPath}/cart`;
      let data = {
        product_id: pid,
        qty:qty
      };
      axios.post(api, {data:data})
        .then(res => {
          // console.log(res);
          alert(res.data.message);
          this.getCart();
          this.resetLoadItem();
        })
        .catch(error => {
          console.log(error);
          alert(error.data.message)
        })
    },
    delCart(cid) {
      this.loadingItem = {
        id: cid,
        part:'del'
      }
      let api = `${apiPath}/cart/${cid}`;
      axios.delete(api).then(res => {
        alert(res.data.message);
        this.getCart();
        this.resetLoadItem();
      })
      .catch(error => {
        console.log(error);
        alert(error.data.message);
      })
    },
    updateCart(item) {
      let api = `${apiPath}/cart/${item.id}`;
      console.log(item, api);
      axios.put(api, {
        data: {
          product_id: item.product_id,
          qty: item.qty
        }
      }).then(res => {
        alert(res.data.message);
        this.getCart();
      })
      .catch(error => {
        console.log(error);
        alert(error.data.message);
      })
    },
    clearCart() {
      let api = `${apiPath}/carts`;
      axios.delete(api)
        .then(res => {
          console.log(res);
          alert(res.data.message);
          this.getCart();
        })
        .catch(error => {
          console.log(error);
          alert(error.data.message)
        })
    },
  },
});
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

