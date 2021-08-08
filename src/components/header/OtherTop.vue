<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240); background: white"
      @back="()=>{}"
    >
      <template slot="backIcon">
        <a-icon
          v-if="this.icontype == 1"
          type="unordered-list"
          class="back-icon"
          @click="showDrawer"
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
          <Timer/>
          <LoginRegister />
        </div>
      </template>
      <slot name="extraleft"></slot>
    </a-page-header>
    <a-drawer
      
      placement="left"
      :closable="false"
      :visible="drawerVisible"
      @close="onDrawerClose"
    >
      <template slot="title">
        <a-divider style="margin:0px" orientation="left"><a-icon type="tags" />{{$t('m.title')}}</a-divider>
      </template>
      <Menu :dtype="1" mode1="vertical"/>
      <a-divider></a-divider>
      <a-menu>
        <a-menu-item @click="setLanguage">
          <a-icon type="global"></a-icon>{{$t("m.language")}}
        </a-menu-item>
        <a-menu-item>
          <router-link to="/other/faq"><a-icon type="bank"></a-icon>{{$t('m.illustrate')}}</router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link to="/login">
            <a-icon type="login"></a-icon>{{$t('m.login')}}
          </router-link>
        </a-menu-item>
        <a-menu-item>
          <div @click="toGithub"><a-icon type="github"></a-icon>Github</div>
        </a-menu-item>
      </a-menu>
      <a-divider></a-divider>
        <a-menu>
          <a-menu-item @click="showSupport">
            <a-icon type="like"></a-icon>{{$t('m.support')}}
          </a-menu-item>
        </a-menu>
    </a-drawer>
    <a-modal v-model="supportVisible" :footer="null" :width="400">
      <img src="~@/common/images/support.png" alt="" style="width: 100%">
    </a-modal>
    <a-modal v-model="languageVisible" :footer="null" >
      <Language/>
    </a-modal>
  </div>
</template>
<script>
import LoginRegister from "@/components/function/LoginRegister.vue";
import Language from "@/components/function/Language"
import Menu from "@/components/header/Menu"
import Timer from "@/components/function/Timer";
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
      drawerVisible:false,
      supportVisible:false,
      languageVisible:false,
    }
  },
  components: {
    LoginRegister,
    Menu,
    Language,
    Timer
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
    },
    showSupport(){
      this.supportVisible=!this.supportVisible
    },
    setLanguage(){
      this.languageVisible=true
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