<template>
  <div class="wrapper">
    <div class="search">
      <a-row>
        <a-col :span="4" offset="1">
          <a-select style="width: 80px" v-model="selectedPersonNum">
            <a-select-option
              v-for="(num, key) in personNum"
              :value="num"
              :key="key"
              ><a-icon type="user" /> {{ num }}</a-select-option
            >
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-select style="width: 120px" v-model="selectedSpace">
            <a-select-option
              v-for="(space, key) in spaceType"
              :value="space"
              :key="key"
              ><a-icon type="bank" /> {{ space }}</a-select-option
            >
          </a-select>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="11" offset="1">
          <a-input-group compact size="large" class="btn-group">
            <a-dropdown>
              <a-menu slot="overlay" >
                <a-menu-item key="1"> 北京 </a-menu-item>
                <a-menu-item key="2"> 悉尼 </a-menu-item>
                <a-menu-item key="3"> 香港 </a-menu-item>
              </a-menu>
              <a-input
                style="width: 50%"
                :placeholder="$t('m.startPoint')"
                v-model="startPos"
              >
                <a-icon slot="prefix" type="paper-clip"></a-icon
              ></a-input>
            </a-dropdown>
            <a-dropdown>
              <a-menu slot="overlay" >
                <a-menu-item key="1"> 北京 </a-menu-item>
                <a-menu-item key="2"> 悉尼 </a-menu-item>
                <a-menu-item key="3"> 香港 </a-menu-item>
              </a-menu>
              <a-input
                style="width: 50%"
                :placeholder="$t('m.endPoint')"
                v-model="destination"
              >
                <a-icon slot="prefix" type="environment"></a-icon>
              </a-input>
            </a-dropdown>
          </a-input-group>
        </a-col>
        <a-col :span="10" offset="1">
          <a-range-picker
            size="large"
            v-model="date"
            :value="date"
            :placeholder="['开始日期', '结束日期']"
          >
            <template slot="renderExtraFooter"> 请选择日期 </template>
            <a-icon slot="suffixIcon" type="calendar" />
          </a-range-picker>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col>
          <a-button
            type="primary"
            icon="search"
            class="search-btn"
            size="large"
            @click="gotoFlightList()"
          >
            {{ $t("m.search") }}
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "FlightSearch",
  data() {
    return {
      selectedPersonNum: 1,
      personNum: [1, 2, 3, 4],
      selectedSpace: "经济仓",
      spaceType: ["经济舱", "豪华经济舱", "商务舱", "头等舱"],
      startPos: "",
      destination: "",
      date: [],
    };
  },
  methods: {
    handleSubmit(e) {
      console.log(e);
      console.log(this.formInline);
    },
    gotoFlightList() {
      this.$router.push({ path: "/other/Flightdetail" });
    },
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
.search {
  width: 100%;
  border: 1px grey solid;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
}
.search > * {
  margin-top: 20px;
}
.search-btn {
  box-shadow: grey 5px 5px 5px;
  bottom: -20px;
}
</style>
