<template>
  <div>
    <OtherTop :icontype="2">
      <template slot="extraleft">
        <a-steps :current=currstep>
          <a-step>
            <template slot="title"> 填写信息 </template>
            <span slot="description"> 填写相关信息</span>
          </a-step>
          <a-step>
            <template slot="title"> 支付 </template>
            <span slot="description"> 请选择支付</span>
          </a-step>
          <a-step>
            <template slot="title"> 完了 </template>
            <span slot="description"> 付款成功</span>
          </a-step>
        </a-steps>
      </template>
    </OtherTop>
    <div class="main">
      <div class="menuwrapper"><Menu :dtype="2" class="menu" /></div>
      <div class="maincontent">
          <PayMethod v-show="this.currstep==1"/>
          <PayFinish v-show="this.currstep==2"/>
      </div>
    </div>
    <Footer :iconvisable="false"/>
  </div>
</template>
<script>
import OtherTop from "@/components/header/OtherTop";
import Footer from "@/components/footer/Footer";
import Menu from "@/components/header/Menu"
import PayMethod from "@/components/function/PayMethod"
import PayFinish from "@/components/function/PayFinish"

export default {
  name: "Pay",
  data(){
      return{
          currstep:2
      }
  },
  components: {
    OtherTop,
    Footer,
    Menu,
    PayMethod,
    PayFinish
  },
};
</script>
<style scoped>
.main {
  display: flex;
  width: 100%;
}
.menuwrapper {
  width: 120px;
  z-index: 100;
}
.menu {
  position: fixed;
}
.maincontent{
    margin: 30px;
    width: 100%;
}
</style> 