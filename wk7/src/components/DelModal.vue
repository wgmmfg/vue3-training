<template>
  <div id="delModal" ref="delModal" class="modal fade" tabindex="-1"
    aria-labelledby="delModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delModalLabel" class="modal-title">
            <span>刪除</span>
          </h5>
          <button type="button" class="btn-close btn-close-white"
           data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger" v-text="curItem.title"></strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteItem"
           :disabled="editStatus=='deleting'">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['curItem', 'editStatus'],
  data() {
    return {
      modal: '',
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.delModal);
  },
  methods: {
    deleteItem() {
      this.$emit('deleteItem');
      this.hideModal();
    },
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
};
</script>
