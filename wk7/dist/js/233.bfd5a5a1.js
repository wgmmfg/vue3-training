"use strict";(self["webpackChunkwk7"]=self["webpackChunkwk7"]||[]).push([[233],{233:function(e,t,s){s.r(t),s.d(t,{default:function(){return be}});var l=s(3396),a=s(7139);const d=(0,l._)("h2",null,"Order",-1),r={class:"container-fluid"},o={class:"table mt-4"},i=(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",null,"購買時間"),(0,l._)("th",null,"Email"),(0,l._)("th",null,"購買款項"),(0,l._)("th",null,"應付金額"),(0,l._)("th",null,"是否付款"),(0,l._)("th",null,"編輯")])],-1),n={class:"list-unstyled"},c=["onClick"],u={key:0,class:"text-success"},h={key:1},p={class:"btn-group"},_=["onClick"],m=["onClick"];function g(e,t,s,g,b,w){const k=(0,l.up)("Pagination"),y=(0,l.up)("DelModal"),O=(0,l.up)("OrderModal");return(0,l.wg)(),(0,l.iD)("div",null,[d,(0,l._)("div",r,[(0,l._)("table",o,[i,(0,l._)("tbody",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(b.orders,(e=>((0,l.wg)(),(0,l.iD)("tr",{key:e.id},[(0,l._)("td",null,(0,a.zw)(new Date(1e3*e.create_at).toLocaleString()),1),(0,l._)("td",null,(0,a.zw)(`${e.user.email} (${e.user.name})`),1),(0,l._)("td",null,[(0,l._)("ul",n,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.products,(e=>((0,l.wg)(),(0,l.iD)("li",{key:e.id},(0,a.zw)(`${e.product.title}: ${e.qty} ${e.product.unit}`),1)))),128))])]),(0,l._)("td",null,(0,a.zw)(e.total),1),(0,l._)("td",null,[(0,l._)("button",{class:"btn btn-outline-secondary",onClick:t=>w.updatePaid(e,!e.is_paid)},[e.is_paid?((0,l.wg)(),(0,l.iD)("span",u,"已付")):((0,l.wg)(),(0,l.iD)("span",h,"未付"))],8,c)]),(0,l._)("td",null,[(0,l._)("div",p,[(0,l._)("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:t=>w.showModal("edit",e)}," 編輯 ",8,_),(0,l._)("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:t=>w.showModal("delete",e)}," 刪除 ",8,m)])])])))),128))])]),(0,l.Wm)(k,{pages:b.pagination,onGetOrders:w.getOrders},null,8,["pages","onGetOrders"])]),(0,l.Wm)(y,{ref:"delModal","cur-item":b.curOrder,onDeleteItem:w.deleteItem},null,8,["cur-item","onDeleteItem"]),(0,l.Wm)(O,{ref:"orderModal","cur-order":b.curOrder,onUpdateOrder:w.updateOrder},null,8,["cur-order","onUpdateOrder"])])}var b=s(9242);const w={id:"orderModal",ref:"orderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"OrderModalLabel","aria-hidden":"true"},k={class:"modal-dialog modal-xl"},y={class:"modal-content border-0"},O=(0,l._)("div",{class:"modal-header bg-dark text-white"},[(0,l._)("h5",{id:"OrderModalLabel",class:"modal-title"},"訂單內容"),(0,l._)("button",{type:"button",class:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close"})],-1),v={class:"modal-body"},f={class:"row"},D={class:"col-12 col-md-4"},M=(0,l._)("h3",null,"收件人",-1),$={key:0,class:"list-unstyled"},z={class:"p-1"},x=(0,l._)("strong",{class:"me-2"},"姓名",-1),U={class:"p-1"},C=(0,l._)("strong",{class:"me-2"},"電郵",-1),S={class:"p-1"},P=(0,l._)("strong",{class:"me-2"},"電話",-1),q={class:"p-1"},I=(0,l._)("strong",{class:"me-2"},"地址",-1),L={class:"col-12 col-md-8"},Z=(0,l._)("h3",null,"詳情",-1),H={key:0,class:"list-unstyled"},K={class:"p-1"},W=(0,l._)("strong",{class:"me-2"},"訂單編號",-1),Y={class:"p-1"},G=(0,l._)("strong",{class:"me-2"},"下單時間",-1),J={class:"p-1"},N=(0,l._)("strong",{class:"me-2"},"付款狀態",-1),j={key:0,class:"text-success"},E={key:1},V={class:"p-1"},A=(0,l._)("strong",{class:"me-2"},"留言",-1),B=(0,l._)("br",null,null,-1),F=(0,l._)("hr",null,null,-1),Q=(0,l._)("h3",null,"選購商品",-1),R={key:1,class:"list-unstyled"},T={class:"d-inline-block ms-auto"},X={class:"d-flex justify-content-end"},ee={class:"form-check"},te={class:"form-check-label",for:"isPaid"},se={key:0},le={key:1},ae={class:"modal-footer"},de=(0,l._)("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function re(e,t,s,d,r,o){return(0,l.wg)(),(0,l.iD)("div",w,[(0,l._)("div",k,[(0,l._)("div",y,[O,(0,l._)("div",v,[(0,l._)("div",f,[(0,l._)("div",D,[M,r.order.user?((0,l.wg)(),(0,l.iD)("ul",$,[(0,l._)("li",z,[x,(0,l.Uk)(" "+(0,a.zw)(r.order.user.name),1)]),(0,l._)("li",U,[C,(0,l.Uk)(" "+(0,a.zw)(r.order.user.email),1)]),(0,l._)("li",S,[P,(0,l.Uk)(" "+(0,a.zw)(r.order.user.tel),1)]),(0,l._)("li",q,[I,(0,l.Uk)(" "+(0,a.zw)(r.order.user.address),1)])])):(0,l.kq)("",!0)]),(0,l._)("div",L,[Z,r.order.id?((0,l.wg)(),(0,l.iD)("ul",H,[(0,l._)("li",K,[W,(0,l.Uk)(" "+(0,a.zw)(r.order.id),1)]),(0,l._)("li",Y,[G,(0,l.Uk)(" "+(0,a.zw)(new Date(1e3*r.order.create_at).toLocaleString()),1)]),(0,l._)("li",J,[N,r.order.is_paid?((0,l.wg)(),(0,l.iD)("span",j,"已付")):((0,l.wg)(),(0,l.iD)("span",E,"未付"))]),(0,l._)("li",V,[A,B,(0,l.Uk)(" "+(0,a.zw)(r.order.message),1)])])):(0,l.kq)("",!0),F,Q,r.order.products?((0,l.wg)(),(0,l.iD)("ul",R,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(r.order.products,(e=>((0,l.wg)(),(0,l.iD)("li",{key:e.id,class:"d-flex"},[(0,l.Uk)((0,a.zw)(`${e.product.title}: ${e.qty} ${e.product.unit}`)+" ",1),(0,l._)("span",T,(0,a.zw)(e.final_total),1)])))),128))])):(0,l.kq)("",!0),(0,l._)("div",X,[(0,l._)("div",ee,[(0,l.wy)((0,l._)("input",{class:"form-check-input",type:"checkbox",id:"isPaid","onUpdate:modelValue":t[0]||(t[0]=e=>r.order.is_paid=e)},null,512),[[b.e8,r.order.is_paid]]),(0,l._)("label",te,[r.order.is_paid?((0,l.wg)(),(0,l.iD)("span",se,"已付")):((0,l.wg)(),(0,l.iD)("span",le,"未付"))])])])])])]),(0,l._)("div",ae,[de,(0,l._)("button",{type:"button",class:"btn btn-primary",onClick:t[1]||(t[1]=(...e)=>o.updateOrder&&o.updateOrder(...e))}," 確認 ")])])])],512)}var oe=s(7972),ie=s.n(oe),ne={props:["curOrder"],data(){return{modal:{},order:{}}},watch:{curOrder(e){this.order=e}},mounted(){this.modal=new(ie())(this.$refs.orderModal)},methods:{showModal(){this.modal.show()},hideModal(){this.modal.hide()},updateOrder(){this.$emit("update-order",this.order),this.hideModal()}}},ce=s(89);const ue=(0,ce.Z)(ne,[["render",re]]);var he=ue,pe=s(3347),_e=s(3523),me={data(){return{orders:[],pagination:{},editStatus:"",curOrder:{}}},components:{Pagination:_e.Z,DelModal:pe.Z,OrderModal:he},mounted(){this.getOrders()},methods:{getOrders(e=1){const t=`https://vue3-course-api.hexschool.io/v2/api/ying0622/admin/orders?page=${e}`;this.$http.get(t).then((e=>{this.orders=e.data.orders,this.pagination=e.data.pagination})).catch((e=>{console.log(e)}))},updatePaid(e,t){const s={...e};s.is_paid=t;const l=`https://vue3-course-api.hexschool.io/v2/api/ying0622/admin/order/${s.id}`;this.$http.put(l,{data:s}).then((e=>{alert(e.data.message),this.getOrders()}))},updateOrder(e){const t=`https://vue3-course-api.hexschool.io/v2/api/ying0622/admin/order/${e.id}`;this.$http.put(t,{data:e}).then((e=>{alert(e.data.message),this.getOrders()}))},deleteItem(){this.editStatus="deleting";const e=`https://vue3-course-api.hexschool.io/v2/api/ying0622/admin/order/${this.curOrder.id}`;this.$http.delete(e).then((e=>{alert(e.data.message),this.editStatus="",this.getOrders()})).catch((e=>{console.log(e)}))},showModal(e,t){this.editStatus=e,this.curOrder=JSON.parse(JSON.stringify(t));let s={};switch(this.editStatus){case"delete":s=this.$refs.delModal,s.showModal();break;case"edit":console.log(this.curOrder),s=this.$refs.orderModal,s.showModal();break;default:break}}}};const ge=(0,ce.Z)(me,[["render",g]]);var be=ge}}]);
//# sourceMappingURL=233.bfd5a5a1.js.map