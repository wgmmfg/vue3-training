<template>
  <div>
    <h2>Products list</h2>
    <div class="container">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div
                v-if="product.imageUrl"
                style="height: 100px; background-size: cover; background-position: center;"
                :style="
                  'background-image:url(' + product.imageUrl + ')'
                "
              ></div>
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              <div
                class="h5"
                v-if="!product.price || product.origin_price == product.price"
              >
                {{ product.price }} 元
              </div>
              <del class="h6" v-if="product.price < product.origin_price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h5" v-if="product.price < product.origin_price">
                現在只要 {{ product.price }} 元
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="showInfo(product.id)"
                  :disabled="loadingItem.id == product.id"
                >
                  <i
                    v-if="
                      loadingItem.id == product.id && loadingItem.part == 'view'
                    "
                    class="fas fa-spinner fa-pulse"
                  ></i>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCart(product.id)"
                  :disabled="loadingItem.id == product.id"
                >
                  <i
                    v-if="
                      loadingItem.id == product.id &&
                      loadingItem.part == 'addCart'
                    "
                    class="fas fa-spinner fa-pulse"
                  ></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      pagination: {},
      loadingItem: {
        id: '',
        part: '',
      },
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http(api)
        .then((res) => {
          // console.log(res);
          this.products = res.data.products;
          // this.pagination = res.data.pagination;
        })
        .catch((error) => {
          console.log(error);
          alert(error.data.message);
        });
    },
  },
};
</script>
