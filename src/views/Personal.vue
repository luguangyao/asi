<template>
  <div class="personalwrapper">
    <a-layout id="components-layout-demo-top-side-2">
      <OtherTop :icontype="2" />
      <a-layout id="components-layout-demo-side" style="min-height: 100vh">
        <a-layout-sider v-model="collapsed" collapsible theme="light">
          <div class="logo">
            <a-icon type="smile" theme="twoTone" class="logoicon" />
          </div>
          <a-menu
            :default-selected-keys="['1']"
            mode="inline"
            :default-open-keys="['user', 'orders message']"
          >
            <a-sub-menu :key="me.name" v-for="me in this.menudata">
              <span slot="title"
                ><a-icon :type="me.icon" class="icon" /><span
                  ><strong>{{ me.name }}</strong></span
                ></span
              >
              <a-menu-item
                :key="mee.name"
                v-for="mee in me.children"
                @click="gotoDetail(me, mee)"
              >
                {{ mee.name }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout class="content">
          <a-layout-content style="margin: 16px 16px" class="layoutcontet">
            <div
              :style="{
                padding: '24px',
                background: '#fff',
                minHeight: '560px',
              }"
            >
            <router-view></router-view>
            </div>
          </a-layout-content>
          <a-layout-footer class="layoutfooter">
            <Footer :iconvisable="false" />
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import OtherTop from "@/components/header/OtherTop";
import Footer from "@/components/footer/Footer";
export default {
  name: "Personal",
  data() {
    return {
      collapsed: false,
      menudata: this.$store.state.personalMenuList
    };
  },
  methods: {
    gotoDetail(me, mee) {
      console.log("/personal"+me.url+"/"+mee.name)
      this.$router.push({path:"/personal"+me.url+"/"+mee.name})
      // this.$router.go(0)
    },
  },
  components: {
    OtherTop,
    Footer,
  },
  created(){
  }
};
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  text-align: center;
}
.logoicon {
  font-size: 30px;
  animation: turn 1s linear infinite;
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.layoutfooter {
  background-color: rgba(255, 255, 255, 0);
}
.content {
  background-image: url("~@/common/images/background.png");
}
.content::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(68, 67, 67, 0.2);
  background: grey;
}
.content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.nextpage {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon {
  font-size: 20px;
}
</style>
