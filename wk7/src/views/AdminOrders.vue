<template>
  <div>
    <h2>Order</h2>
    <div class="container-fluid">
        <table class="table mt-4">
          <thead>
            <tr>
              <th>購買時間</th>
              <th>Email</th>
              <th>購買款項</th>
              <th>應付金額</th>
              <th>是否付款</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ new Date(order.create_at * 1000).toLocaleString() }}</td>
              <td>{{ `${order.user.email} (${order.user.name})` }}</td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="p in order.products" :key="p.id">
                    {{ `${p.product.title}: ${p.qty} ${p.product.unit}` }}
                  </li>
                </ul>
              </td>
              <td>{{ order.total }}</td>
              <td>
                <button class="btn btn-outline-secondary"
                 @click="updatePaid(order, !order.is_paid)">
                  <span v-if="order.is_paid" class="text-success">已付</span>
                  <span v-else>未付</span>
                </button>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-primary btn-sm"
                     @click="showModal('edit', order)">
                    編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                    @click="showModal('delete', order)">
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination :pages="pagination" @get-orders="getOrders"/>
    </div>
    <DelModal ref="delModal" :cur-item="curOrder" @delete-item="deleteItem"/>
    <OrderModal ref="orderModal" :cur-order="curOrder" @update-order="updateOrder"/>
  </div>
</template>

<script>
import OrderModal from '@/components/OrderModal.vue';
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/PaginationItem.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      editStatus: '',
      curOrder: {},
    };
  },
  components: {
    Pagination,
    DelModal,
    OrderModal,
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http.get(api).then((res) => {
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
      }).catch((error) => {
        console.log(error);
      });
    },
    updatePaid(order, isPaid) {
      const item = { ...order };
      item.is_paid = isPaid;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.$http.put(api, { data: item }).then((res) => {
        // console.log(res);
        alert(res.data.message);
        this.getOrders();
      });
    },
    updateOrder(item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.$http.put(api, { data: item }).then((res) => {
        // console.log(res);
        alert(res.data.message);
        this.getOrders();
      });
    },
    deleteItem() {
      this.editStatus = 'deleting';
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.curOrder.id}`;
      this.$http.delete(api).then((res) => {
        alert(res.data.message);
        this.editStatus = '';
        this.getOrders();
      }).catch((error) => {
        console.log(error);
      });
    },
    showModal(inStatus, item) {
      this.editStatus = inStatus;
      this.curOrder = JSON.parse(JSON.stringify(item));
      let modal = {};
      switch (this.editStatus) {
        case 'delete':
          modal = this.$refs.delModal;
          modal.showModal();
          break;
        case 'edit':
          console.log(this.curOrder);
          modal = this.$refs.orderModal;
          modal.showModal();
          break;
        default:
          break;
      }
    },
  },
};
</script>
