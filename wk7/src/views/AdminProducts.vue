<template>
  <div>
    <h2>Product list</h2>
    <div class="container-fluid">
        <div class="text-end mt-4">
          <button class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#productModal" @click="editStatus='add'">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">
                分類
              </th>
              <th>產品名稱</th>
              <th width="120">
                原價
              </th>
              <th width="120">
                售價
              </th>
              <th width="100">
                是否啟用
              </th>
              <th width="120">
                編輯
              </th>
            </tr>
          </thead>
          <tbody v-if="products.length>0">
            <tr v-for="p,idx in products" :key="'p'+idx">
              <td>{{ p.category }}</td>
              <td>{{ p.title }}</td>
              <td class="text-end">{{ p.origin_price }}</td>
              <td class="text-end">{{ p.price }}</td>
              <td>
                <span v-if="p.is_enabled > 0" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm"
                    data-bs-toggle="modal" data-bs-target="#productModal"
                     @click="editItem(p)">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                    data-bs-toggle="modal" data-bs-target="#delProductModal"
                    @click="curProduct = p">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" class="text-center">
                <div class="spinner-border text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination :pages="pagination" @get-products="getProducts"/>
      </div>
    <DelModal :cur-item="curProduct" @deleteItem="deleteItem"/>
    <ProductModal :item="curProduct" :edit-status="editStatus"
     @add-images="addImages" @update-item="updateItem"/>
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/PaginationItem.vue';

export default {
  data() {
    return {
      products: [],
      curProduct: {
        imagesUrl: [],
      },
      editStatus: '',
      pagination: {},
    };
  },
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  mounted() {
    // productModal = new bootstrap.Modal(document.getElementById('productModal'));
    // document.getElementById('productModal').addEventListener('hidden.bs.modal', (event) => {
    //   this.resetData();
    // });
    // delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    // document.getElementById('delProductModal').addEventListener('hidden.bs.modal', (event) => {
    //   this.resetData();
    // });
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(api)
        .then((res) => {
          // console.log(res);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((error) => {
          console.log(error);
          alert(error.data.message);
        });
    },
    addImages() {
      this.curProduct.imagesUrl = [];
      this.curProduct.imagesUrl.push('');
    },
    addItem() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      this.$http.post(api, { data: this.curProduct })
        .then((res) => {
          // console.log(res);
          alert(res.data.message);
          // productModal.hide();
          this.getProducts();
        })
        .catch((error) => {
          console.log(error);
          alert(error.data.message);
        });
    },
    editItem(item) {
      // console.log('edit: ', item, item.id);
      this.curProduct = JSON.parse(JSON.stringify(item));
      this.editStatus = 'edit';
    },
    updateItem() {
      const data = this.curProduct;
      if (this.editStatus === 'edit') {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.curProduct.id}`;
        console.log(api, data);
        this.$http.put(api, { data })
          .then((res) => {
            // console.log(res);
            alert(res.data.message);
            // productModal.hide();
            this.getProducts();
          })
          .catch((error) => {
            console.log(error);
            alert(error.data.message);
          });
      } else {
        this.addItem();
      }
    },
    deleteItem() {
      this.editStatus = 'deleting';
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.curProduct.id}`;
      this.$http.delete(api)
        .then((res) => {
          // console.log(res);
          alert(res.data.message);
          // delProductModal.hide();
          // console.log(bootstrap.Modal.getInstance(this.$refs.delProductModal));
          this.getProducts();
          this.resetData();
        })
        .catch((error) => {
          console.log(error);
          alert(error.data.message);
        });
    },
    resetData() {
      this.curProduct = {
        imagesUrl: [],
      };
      this.editStatus = '';
    },
  },
};
</script>
