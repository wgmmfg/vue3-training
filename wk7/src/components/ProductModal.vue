<template>
  <div id="productModal" ref="productModal" class="modal fade"
   tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span v-text="editStatus=='edit'?'編輯產品':'新增產品'"></span>
        </h5>
        <button type="button" class="btn-close btn-close-white"
         data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-5">
              <h4>主要圖片</h4>
              <div class="mb-3">
                <!-- eslint-disable-next-line -->
                <label for="imageUrl" class="form-label visually-hidden">輸入圖片網址</label>
                <input type="text" id="imageUrl" class="form-control"
                 v-model="curProduct.imageUrl"
                 placeholder="請輸入圖片連結">
                 <div class="py-1">
                  <!-- eslint-disable-next-line -->
                  <label for="upload" class="form-label">或 上傳圖片</label>
                  <input id="upload" type="file" name="file-to-upload"
                   ref="uploadMain" @change="uploadImg" class="form-control">
                 </div>
              </div>
              <img class="img-fluid" :src="curProduct.imageUrl" alt="">
            </div>
            <div>
              <h4>其他圖片</h4>
              <div v-if="Array.isArray(curProduct.imagesUrl)">
                <div v-for="img,idx in curProduct.imagesUrl" :key="'imgs'+idx">
                  <div class="mb-3">
                <!-- eslint-disable-next-line -->
                    <label :for="'imagesUrl'+idx" class="form-label">圖片 {{ idx+1 }} 網址</label>
                    <input type="text" :id="'imagesUrl'+idx" class="form-control"
                     v-model="curProduct.imagesUrl[idx]"
                    placeholder="請輸入圖片連結">
                  </div>
                  <img v-if="curProduct.imagesUrl[idx]" class="img-fluid mb-2"
                   :src="curProduct.imagesUrl[idx]" alt="">
                  <button class="btn btn-outline-danger btn-sm d-block w-100 mb-4"
                   @click="curProduct.imagesUrl.splice(idx,1)">
                    刪除圖片 {{ idx+1 }}
                  </button>
                </div>
                <div>
                  <button v-if="!curProduct.imagesUrl.length
                   || curProduct.imagesUrl[curProduct.imagesUrl.length - 1]"
                   class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="curProduct.imagesUrl.push('')">
                    新增圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button class="btn btn-outline-primary btn-sm w-100" @click="addImages">
                  新增圖片
                </button>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
                <!-- eslint-disable-next-line -->
              <label for="title" class="form-label">標題</label>
              <input id="title" type="text" class="form-control"
               placeholder="請輸入標題" v-model="curProduct.title">
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <!-- eslint-disable-next-line -->
                <label for="category" class="form-label">分類</label>
                <input id="category" type="text" class="form-control" v-model="curProduct.category"
                        placeholder="請輸入分類">
              </div>
              <div class="mb-3 col-md-6">
                <!-- eslint-disable-next-line -->
                <label for="price" class="form-label">單位</label>
                <input id="unit" type="text" class="form-control"
                 placeholder="請輸入單位" v-model="curProduct.unit">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <!-- eslint-disable-next-line -->
                <label for="origin_price" class="form-label">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control"
                 placeholder="請輸入原價" v-model.number="curProduct.origin_price">
              </div>
              <div class="mb-3 col-md-6">
                <!-- eslint-disable-next-line -->
                <label for="price" class="form-label">售價</label>
                <input id="price" type="number" min="0"
                 class="form-control" v-model.number="curProduct.price"
                        placeholder="請輸入售價">
              </div>
            </div>
            <hr>

            <div class="mb-3">
                <!-- eslint-disable-next-line -->
              <label for="description" class="form-label">產品描述</label>
              <textarea id="description" type="text" class="form-control"
               v-model="curProduct.description"
                        placeholder="請輸入產品描述">
              </textarea>
            </div>
            <div class="mb-3">
                <!-- eslint-disable-next-line -->
              <label for="content" class="form-label">說明內容</label>
              <textarea id="description" type="text" class="form-control"
               v-model="curProduct.content"
                        placeholder="請輸入說明內容">
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input"
                 type="checkbox" v-model="curProduct.is_enabled"
                        :true-value="1" :false-value="0">
                <!-- eslint-disable-next-line -->
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="updateItem">
          確認
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      curProduct: {},
      modal: {},
    };
  },
  watch: {
    item(p) {
      this.curProduct = p;
    },
  },
  mounted() {
    // console.log(this.item, this.curProduct);
    this.modal = new Modal(this.$refs.productModal);
  },
  props: ['item', 'editStatus'],
  methods: {
    showModal() {
      this.modal.show();
    },
    updateItem() {
      this.$emit('updateItem');
      this.modal.hide();
    },
    addImages() {
      this.$emit('addImages');
    },
    uploadImg() {
      const imgFile = this.$refs.uploadMain.files[0];
      const formdata = new FormData();
      formdata.append('file-to-update', imgFile);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(api, formdata)
        .then((res) => {
          // console.log(res);
          this.curProduct.imageUrl = res.data.imageUrl;
          this.$refs.uploadMain.value = '';
        })
        .catch((error) => {
          console.log(error);
          this.$refs.uploadMain.value = '';
        });
    },
  },
};
</script>
