"use strict";(self["webpackChunkwk7"]=self["webpackChunkwk7"]||[]).push([[346],{7346:function(e,s,r){r.r(s),r.d(s,{default:function(){return b}});var t=r(3396),n=r(9242),o=r(7139);const a={class:"container py-5"},i=(0,t._)("h1",{class:"h3 mb-3 font-weight-normal text-center"},"請先登入",-1),l={class:"row justify-content-center"},c={class:"col-8"},u={key:0,class:"alert alert-warning",role:"alert"},d={class:"form-floating mb-3"},m=(0,t._)("label",{for:"username"},"Email address",-1),p={class:"form-floating"},h=(0,t._)("label",{for:"password"},"Password",-1),w=(0,t._)("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1);function f(e,s,r,f,g,k){return(0,t.wg)(),(0,t.iD)("div",null,[(0,t._)("div",a,[i,(0,t._)("div",l,[(0,t._)("div",c,[(0,t._)("form",{id:"form",class:"form-signin",onSubmit:s[2]||(s[2]=(0,n.iM)(((...e)=>k.checkLogin&&k.checkLogin(...e)),["prevent"]))},[g.msg?((0,t.wg)(),(0,t.iD)("div",u,(0,o.zw)(g.msg),1)):(0,t.kq)("",!0),(0,t._)("div",d,[(0,t.wy)((0,t._)("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"","onUpdate:modelValue":s[0]||(s[0]=e=>g.user.username=e)},null,512),[[n.nr,g.user.username]]),m]),(0,t._)("div",p,[(0,t.wy)((0,t._)("input",{type:"password",class:"form-control",id:"password",placeholder:"Password",required:"","onUpdate:modelValue":s[1]||(s[1]=e=>g.user.password=e)},null,512),[[n.nr,g.user.password]]),h]),w],32)])])])])}var g={data(){return{user:{username:"",password:""},msg:""}},mounted(){},methods:{checkLogin(){const e="https://vue3-course-api.hexschool.io/v2/admin/signin";this.msg="",this.$http.post(e,this.user).then((e=>{console.log(e);const{token:s,expired:r}=e.data;document.cookie=`token=${s};expires=${new Date(r)}; path=/`,this.$router.push("/admin/products")})).catch((e=>{this.msg=e.data.message}))}}},k=r(89);const v=(0,k.Z)(g,[["render",f]]);var b=v}}]);
//# sourceMappingURL=346.ae4867d7.js.map