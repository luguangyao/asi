<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240); background: white"
      @back="showDrawer"
    >
      <template slot="backIcon">
        <a-icon
          v-if="this.icontype == 1"
          type="unordered-list"
          class="back-icon"
        ></a-icon>
        <a-icon
          v-else-if="this.icontype == 2"
          type="left"
          class="back-icon"
          @click="back"
        ></a-icon>
      </template>
      <template slot="title">
        <h3>{{ $t("m.title") }}</h3>
      </template>
      <template slot="subTitle">
        <h4>{{ $t("m.sub_title") }}</h4>
      </template>
      <template slot="extra">
        <div class="extracontent">
          <LoginRegister />
        </div>
      </template>
      <slot name="extraleft"></slot>
    </a-page-header>
    <a-drawer
      :title="this.$t('m.title')"
      placement="left"
      :closable="false"
      :visible="drawerVisible"
      @close="onDrawerClose"
    >
      <Menu :dtype="1" mode1="vertical"/>
      <a-divider></a-divider>
      <a-menu>
        <a-menu-item>
          <a-icon type="global"></a-icon>语言
        </a-menu-item>
        <a-menu-item>
          <a-icon type="bank"></a-icon>{{$t('m.illustrate')}}
        </a-menu-item>
        <a-menu-item>
          <div @click="toGithub"><a-icon type="github"></a-icon>Github</div>
        </a-menu-item>
      </a-menu>
    </a-drawer>
  </div>
</template>
<script>
import LoginRegister from "@/components/function/LoginRegister.vue";
import Menu from "@/components/header/Menu"
export default {
  name: "OtherTop",
  props: {
    icontype: {
      type: Number,
      default: 1,
    },
  },
  data(){
    return{
      drawerVisible:false
    }
  },
  components: {
    LoginRegister,
    Menu
  },
  methods: {
    back() {
      history.go(-1);
    },
    onDrawerClose(){
      this.drawerVisible=false
    },
    showDrawer(){
      this.drawerVisible=true
    },
    toGithub(){
       window.open("https://github.com/luguangyao/asi",'_blank') // 在新窗口打开外链接
    }
  },
};
</script>
<style scoped>
.back-icon {
  color: grey;
  font-size: 20px;
  transition: all 0.5s;
}
.back-icon:hover {
  color: blueviolet;
  font-size: 25px;
  font: bolder;
  transition: all 0.5s;
}
.extracontent {
  display: flex;
}
.extracontent > * {
  margin-left: 15px;
}
</style>