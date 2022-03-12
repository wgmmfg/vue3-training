<template>
  <div id="orderModal" ref="orderModal" class="modal fade"
   tabindex="-1" aria-labelledby="OrderModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="OrderModalLabel" class="modal-title">訂單內容</h5>
        <button type="button" class="btn-close btn-close-white"
         data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-12 col-md-4">
            <h3>收件人</h3>
            <ul v-if="order.user" class="list-unstyled">
              <li class="p-1"><strong class="me-2">姓名</strong>
              {{ order.user.name }}
              </li>
              <li class="p-1"><strong class="me-2">電郵</strong>
              {{ order.user.email }}
              </li>
              <li class="p-1"><strong class="me-2">電話</strong>
              {{ order.user.tel }}
              </li>
              <li class="p-1"><strong class="me-2">地址</strong>
              {{ order.user.address }}
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-8">
            <h3>詳情</h3>
            <ul v-if="order.id" class="list-unstyled">
              <li class="p-1">
                <strong class="me-2">訂單編號</strong>
                {{ order.id }}
              </li>
              <li class="p-1">
                <strong class="me-2">下單時間</strong>
                {{ new Date(order.create_at * 1000).toLocaleString() }}
              </li>
              <li class="p-1">
                <strong class="me-2">付款狀態</strong>
                <span v-if="order.is_paid" class="text-success">已付</span>
                <span v-else>未付</span>
              </li>
              <li class="p-1">
                <strong class="me-2">留言</strong><br/>
                {{ order.message }}
              </li>
            </ul>
            <hr>
            <h3>選購商品</h3>
            <ul v-if="order.products" class="list-unstyled">
              <li v-for="p in order.products" :key="p.id" class="d-flex">
                {{ `${p.product.title}: ${p.qty} ${p.product.unit}` }}
                <span class="d-inline-block ms-auto">
                  {{ p.final_total }}
                </span>
              </li>
            </ul>
            <div class="d-flex justify-content-end">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  id="isPaid" v-model="order.is_paid" />
                <!-- eslint-disable-next-line -->
                <label class="form-check-label" for="isPaid">
                  <span v-if="order.is_paid">已付</span>
                  <span v-else>未付</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="updateOrder">
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
  props: ['curOrder'],
  data() {
    return {
      modal: {},
      order: {},
    };
  },
  watch: {
    curOrder(item) {
      this.order = item;
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.orderModal);
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    updateOrder() {
      this.$emit('update-order', this.order);
      this.hideModal();
    },
  },
};
</script>
