<template>
  <div>
    <a-menu :mode="this.mode1"  v-show="this.dtype == 1">
      <template v-for="(item, key) in menu">
        <a-menu-item :key="key">
          <router-link :to="item.router"
            ><a-icon :type="item.icon"></a-icon>
            {{ item.display() }}</router-link
          ></a-menu-item
        >
      </template>
    </a-menu>
    <a-menu mode="inline" class="menu" v-show="this.dtype == 2">
      <template v-for="(item, key) in menu">
        <a-menu-item :key="key" style="height: 80px">
          <router-link :to="item.router">
            <div class="card">
              <div class="cardin">
                <a-icon
                  :type="item.icon"
                  slot="cover"
                  style="font-size: 20px; margin: 0px"
                ></a-icon>
              </div>
              <div class="cardin">
                <p>{{ item.display() }}</p>
              </div>
            </div>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    dtype: {
      type: Number,
      default: 1,
    },
    mode1:{
      type:String,
      default:"horizontal"
    }
  },
  data() {
    return {
      menu: [
        {
          name: "Message",
          display: () => this.$t("m.message"),
          icon: "bell",
          router: "/home",
        },
        {
          name: "Flight",
          display: () => this.$t("m.flight"),
          icon: "yuque",
          router: "/other/flight",
        },
        {
          name: "Hotel",
          display: () => this.$t("m.hotel"),
          icon: "credit-card",
          router: "/other/hotel",
        },
        {
          name: "Personal",
          display: () => this.$t("m.personal"),
          icon: "user",
          router: "/personal",
        },
        {
          name: "F&Q",
          display: () => this.$t("m.FAQ"),
          icon: "question-circle",
          router: "/other/flight",
        },
      ],
    };
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
}
.cardin {
  text-align: center;
}
.menu {
  width: 100px;
}
</style>
