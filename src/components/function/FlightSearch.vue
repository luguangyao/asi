<template>
  <div class="wrapper">
    <div class="search" v-if="this.displayType == 'normal'">
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
              <a-menu slot="overlay">
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
              <a-menu slot="overlay">
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
          <a-range-picker size="large" :placeholder="['开始日期', '结束日期']">
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

    <div v-if="this.displayType == 'admin'" class="adminsearch">
      <a-row>
        <a-col :span="5">
          <a-input-group compact>
            <a-input
              style="width: 40%"
              :placeholder="$t('m.filghtid')"
              :disabled="true"
              :bordered="false"
            />
            <a-select style="width: 60%" v-model="searchData.flightid">
              <a-select-option
                v-for="it in this.flihtIdList"
                :key="it"
                :value="it"
                >{{  it==""?"全部":it  }}</a-select-option
              >
            </a-select>
          </a-input-group>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-input-group compact>
            <a-input
              style="width: 40%"
              :placeholder="$t('m.flightcompany')"
              :disabled="true"
              :bordered="false"
            />
            <a-select style="width: 60%" v-model="searchData.airline">
              <a-select-option
                v-for="it in this.airlineList"
                :key="it"
                :value="it"
                >{{  it==""?"全部":it  }}</a-select-option
              >
            </a-select>
          </a-input-group>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-input-group compact>
            <a-input
              style="width: 40%"
              :placeholder="$t('m.model')"
              :disabled="true"
              :bordered="false"
              :allowClear="true"
            />
            <a-select style="width: 60%" v-model="searchData.model">
              <a-select-option
                v-for="it in this.modelList"
                :key="it"
                :value="it"
                >{{  it==""?"全部":it  }}</a-select-option
              >
            </a-select>
          </a-input-group>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-input-group compact class="btn-group">
            <a-input
              :placeholder="$t('m.seat')"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-select style="width: 60%" v-model="searchData.seatall">
              <a-select-option
                v-for="it in this.seatallList"
                :key="it"
                :value="it"
                >{{  it==""?"全部":it  }}</a-select-option
              >
            </a-select>
          </a-input-group>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px">
        <a-col :span="5">
          <a-input-group compact>
            <a-input
              :placeholder="$t('m.departure')"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-select style="width: 60%" v-model="searchData.departure">
              <a-select-option
                v-for="it in this.departureList"
                :key="it"
                :value="it"
                >{{  it==""?"全部":it  }}</a-select-option
              >
            </a-select>
          </a-input-group>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-input-group compact>
            <a-input
              :placeholder="$t('m.destination')"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-select style="width: 60%" v-model="searchData.destination">
              <a-select-option
                v-for="it in this.destinationList"
                :key="it"
                :value="it"
                >{{  it==""?"全部":it  }}</a-select-option
              >
            </a-select>
          </a-input-group>
        </a-col>

        <a-col :span="11" :offset="1">
          <a-input-group compact class="btn-group">
            <a-input
              :placeholder="$t('m.flightruntime')"
              style="width: 30%"
              :disabled="true"
            ></a-input>
            <a-range-picker
              v-model="distime"
              :value="distime"
              style="width: 70%"
              :placeholder="[$t('m.flgihtstartstoptime'), $t('m.flgihtendstoptime')]"
            >
              <template slot="renderExtraFooter"> 请选择日期 </template>
              <a-icon slot="suffixIcon" type="calendar" />
            </a-range-picker>
          </a-input-group>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px">
        <a-col :span="5">
          <a-input-group compact class="btn-group">
            <a-input
              :placeholder="$t('m.start')"
              style="width: 25%"
              :disabled="true"
            ></a-input>
            <a-time-picker
              placeholder="开始起飞时间"
              v-model="dtime1"
              style="width: 37.5%"
              @change="timeChange('dtime1', 'dtime2')"
            ></a-time-picker>
            <a-time-picker
              placeholder="结束起飞时间"
              v-model="dtime2"
              style="width: 37.5%"
              @change="timeChange('dtime1', 'dtime2')"
            ></a-time-picker>
          </a-input-group>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-input-group compact class="btn-group">
            <a-input
              :placeholder="$t('m.land')"
              style="width: 25%"
              :disabled="true"
            ></a-input>
            <a-time-picker
              placeholder="开始降落时间"
              v-model="atime1"
              style="width: 37.5%"
            ></a-time-picker>
            <a-time-picker
              placeholder="结束降落时间"
              v-model="atime2"
              style="width: 37.5%"
            ></a-time-picker>
          </a-input-group>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-input-group compact class="btn-group">
            <a-input
              :placeholder="$t('m.searchtime')"
              style="width: 40%"
              :disabled="true"
            ></a-input>
            <a-date-picker v-model="date" style="width: 60%"></a-date-picker>
          </a-input-group>
        </a-col>
        <a-col :span="5" :offset="1">
          <a-input-group compact class="btn-group">
            <a-input
              :placeholder="$t('m.pagerange')"
              :disabled="true"
              style="width: 30%"
            ></a-input>
            <a-input-number
              style="width: 35%"
              :min="pageMin"
              :max="pageMax"
              v-model="searchData.min"
              @change="pageChange"
            ></a-input-number>
            <a-input-number
              style="width: 35%"
              :min="pageMin"
              :max="pageMax"
              v-model="searchData.max"
              @change="pageChange"
            ></a-input-number>
          </a-input-group>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px">
        <a-col :span="2">
          <a-input
            :disable="true"
            :placeholder="$t('m.payrange')"
            :disabled="true"
          ></a-input>
        </a-col>
        <a-col :span="20" :offset="1">
          <a-slider
            :min="priceMin"
            :max="priceMax"
            :marks="priceMarks"
            range
            v-model="priceRange"
          ></a-slider>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-button block @click="queryFlights"><strong>{{ $t("m.search") }}</strong></a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import FlightNet from "@/network/FlightNet";
import moment from "moment";
export default {
  name: "FlightSearch",
  props: {
    displayType: {
      type: String,
      default: "normal",
    },
  },
  data() {
    return {
      flihtIdList: [""],
      airlineList: [""],
      modelList: [""],
      departureList: [""],
      destinationList: [""],
      seatallList: [""],
      pageMin: 0,
      pageMax: 40,
      priceMin: 0,
      priceMax: 10000,
      selectedPersonNum: 1,
      personNum: [1, 2, 3, 4],
      selectedSpace: "经济仓",
      spaceType: ["经济舱", "豪华经济舱", "商务舱", "头等舱"],
      startPos: "",
      destination: "",
      priceMarks: {
        0: "￥0",
        10000: {
          style: {
            color: "#f50",
          },
          label: <strong>￥10000</strong>,
        },
      },
      distime: ["", ""],
      date: moment(),
      priceRange: [1000, 7000],
      dtime1: moment("000001", "hhmmss"),
      dtime2: moment("235959", "hhmmss"),
      atime1: moment("000001", "hhmmss"),
      atime2: moment("235959", "hhmmss"),
      searchData: {
        flightid: "",
        departure: "",
        destination: "",
        dtime1: "00:00:01",
        dtime2: "23:59:59",
        atime1: "00:00:01",
        atime2: "23:59:59",
        minprice: 0,
        maxprice: 10000,
        model: "",
        seatall: "",
        airline: "",
        distime1: "",
        distime2: "",
        date: "",
        min: "0",
        max: "40",
      },
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
    pushList(input, output) {
      input.push(...output);
    },
    pageChange() {
      if (this.searchData.min > this.searchData.max) {
        this.searchData.min = this.searchData.max;
        this.$message.info("最小值不能超过最大值");
      }
    },
    timeChange(t1, t2) {
      if (this.searchData[t1] > this.searchData[t2]) {
        this.searchData[t1] = this.searchData[t2];
        this.$message.info("日期错误");
      }
    },
    queryFlights() {
      if (this.distime[0] != "") {
        this.searchData.distime1 = this.distime[0].format("YYYY-MM-DD");
        this.searchData.distime2 = this.distime[1].format("YYYY-MM-DD");
      }
      this.searchData.date = this.date.format("YYYY-MM-DD");
      this.searchData.dtime1 = this.dtime1.format("HH:mm:ss");
      this.searchData.dtime2 = this.dtime2.format("HH:mm:ss");
      this.searchData.atime1 = this.atime1.format("HH:mm:ss");
      this.searchData.atime2 = this.atime2.format("HH:mm:ss");
      FlightNet.queryFlights(
        this.searchData,
        this.queryFlightsSuccess.bind(this),
        this.queryFlightsFailure.bind(this)
      );
    },
    queryFlightsSuccess(data) {
      this.$message.success("数据查询成功!!");
      let listData = {
        "flihtIdList":this.flihtIdList,
        "airlineList":this.airlineList,
        "modelList":this.modelList,
        "departureList":this.departureList,
        "destinationList":this.destinationList,
       "seatallList": this.seatallList,
     };
      this.$emit("getFlightSearchData", data, listData);
    },
    queryFlightsFailure() {
      this.$message.error("查询失败,请检查是否登录");
    },
  },
  created() {
    try {
      FlightNet.searchAllFlightId(this.pushList.bind(this, this.flihtIdList));
      FlightNet.searchAllAirline(this.pushList.bind(this, this.airlineList));
      FlightNet.searchAllModel(this.pushList.bind(this, this.modelList));
      FlightNet.searchAllDeparture(
        this.pushList.bind(this, this.departureList)
      );
      FlightNet.searchAllDestination(
        this.pushList.bind(this, this.destinationList)
      );
      FlightNet.searchAllSeatallList(
        this.pushList.bind(this, this.seatallList)
      );
    } catch (error) {
      error;
    }
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
  background-color: rgba(255, 255, 255, 0.95);
}
.search > * {
  margin-top: 20px;
}
.search-btn {
  box-shadow: grey 5px 5px 5px;
  bottom: -20px;
}
.adminsearch {
  width: 100%;
}
</style>
