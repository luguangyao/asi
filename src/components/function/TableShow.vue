<template>
  <div>
    <div v-if="data.length <= 0">
      <a-empty></a-empty>
    </div>
    <div v-if="data.length > 0">
      <div style="margin-bottom:5px">
        <a-button type="primary" @click="insertFlightBtn"><a-icon type="plus" ></a-icon> 增加航班</a-button>
        <a-button style="float:right" type="primary" href="/admin/flightsPOI" >下崽地址<a-icon type="download"></a-icon> </a-button>
      </div>
      <a-table
        :columns="col"
        :data-source="data"
        size="small"
        :rowKey="(record, index) => record.flightid"
      >
        <template slot="operation" slot-scope="text, record">
          <a-space>
            <a-button
              type="primary"
              shape="circle"
              icon="edit"
              @click="updateData(record)"
            ></a-button>
            <a-button
              type="danger"
              shape="circle"
              icon="delete"
              @click="deleteData(record)"
            ></a-button>
          </a-space>
        </template>
      </a-table>
    </div>
    <a-modal
      :title="modalTitle"
      :visible="isupdate"
      @ok="modalOk"
      @cancel="modalCancle"
      :width="1020"
    >
      <a-row>
        <a-col :span="7">
          <a-input-group>
            <a-input
              placeholder="flightid"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-input
              v-model="updated.flightid"
              style="width: 60%"
              :disabled="this.flightidDisable"
            ></a-input>
          </a-input-group>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-input-group>
            <a-input
              placeholder="departure"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-select
              v-model="updated.departure"
              style="width: 60%"
              @change="checkDepartDestin('departure', 'destination')"
            >
              <a-select-option
                v-for="it in this.listData.departureList"
                :key="it"
                :value="it"
                >{{  it}}</a-select-option
              >
            </a-select>
          </a-input-group>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-input-group>
            <a-input
              placeholder="destination"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-select
              v-model="updated.destination"
              style="width: 60%"
              @change="checkDepartDestin('destination', 'departure')"
            >
              <a-select-option
                v-for="it in this.listData.destinationList"
                :key="it"
                :value="it"
                >{{ it==""?"全部":it }}</a-select-option
              >
            </a-select>
          </a-input-group>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px">
        <a-col :span="7">
          <a-input-group>
            <a-input
              placeholder="起飞时间"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-input
              style="width: 60%"
              v-model="updated.dtime"
              @blur="timeFormatCheck('dtime')"
            ></a-input>
          </a-input-group>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-input-group :span="1">
            <a-input
              placeholder="到达时间"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-input
              style="width: 60%"
              v-model="updated.atime"
              @blur="timeFormatCheck('atime')"
            ></a-input>
          </a-input-group>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-input-group :span="1">
            <a-input
              placeholder="price"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-input-number
              style="width: 60%"
              v-model="updated.price"
              :min="0"
            ></a-input-number>
          </a-input-group>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px">
        <a-col :span="7">
          <a-input-group>
            <a-input
              placeholder="model"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-select v-model="updated.model" style="width: 60%">
              <a-select-option
                v-for="it in this.listData.modelList"
                :key="it"
                :value="it"
                >{{  it }}</a-select-option
              ></a-select
            >
          </a-input-group>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-input-group>
            <a-input
              placeholder="seatall"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-select v-model="updated.seatall" style="width: 60%">
              <a-select-option
                v-for="it in this.listData.seatallList"
                :key="it"
                :value="it"
                >{{  it }}</a-select-option
              >
            </a-select>
          </a-input-group>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-input-group>
            <a-input
              placeholder="airline"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-select v-model="updated.airline" style="width: 60%">
              <a-select-option
                v-for="it in this.listData.airlineList"
                :key="it"
                :value="it"
                >{{  it}}</a-select-option
              >
            </a-select>
          </a-input-group>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px">
        <a-col :span="7">
          <a-input-group>
            <a-input
              placeholder="distiem"
              :disabled="true"
              style="width: 40%"
            ></a-input>
            <a-input
              v-model="updated.distime"
              style="width: 60%"
              @blur="dateFormatCheck('distime')"
            ></a-input>
          </a-input-group>
        </a-col>
      </a-row>
    </a-modal>

    <a-modal
      :title="deleteTitle"
      :visible="isdelete"
      @ok="deleteOk"
      @cancel="deleteCancle"
      :width="1020"
    >
      <div v-if="Object.keys(deleted).length > 0">
        <a-descriptions title="是否确定删除该条航班的信息??">
          <a-descriptions-item v-for="item in Object.keys(deleted)" :key="item" :label="item">
            <strong>{{deleted[item]}}</strong>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-modal>
  </div>
</template>
<script>
import FlightNet from "@/network/FlightNet";
export default {
  name: "TableShow",
  data() {
    return {
      data: [],
      col: [],
      listData: {},
      modalTitle: "title",
      isupdate: false,
      updated: {},
      oldupdated: {},
      deleteTitle: "删除某条记录",
      isdelete: false,
      deleted: {},
      flightidDisable:true,
      
    };
  },
  methods: {
    setData(data, listData) {
      
      this.listData = listData;
      this.data = data.map((d) => d);
      if(data.length<=0){
        this.$message.info("本次没有查询到任何数据",5)
        return
      }
      let keys = Object.keys(this.data[0]);
      this.col = keys.map((k) => {
        return {
          title: k,
          dataIndex: k,
          key: k,
          sorter: (a, b) => a[k] > b[k],
        };
      });
      this.col.push({
        title: "operation",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
      });
    },
    updateData(record) {
      this.flightidDisable=true
      this.modalTitle = "更新数据"
      this.updated = record;
      let key = Object.keys(record);
      this.oldupdated = {};
      key.map((k) => {
        this.oldupdated[k] = record[k];
        return k;
      });
      this.showupdate();
    },
    showupdate() {
      this.isupdate = !this.isupdate;
    },
    modalOk() {
      //this.flightidDisable为 true 时 表示更新数据 为 false 时 表示删除数据
      if(this.flightidDisable==true){
        this.updateFlights()
      }
      else{
        this.insertFlight()
      }
      this.showupdate();
    },
    updateFlights(){
        FlightNet.updateFlights(
        this.updated,
        this.updateSuccess.bind(this),
        this.updateFailure.bind(this)
      );
    },
    updateSuccess() {
      this.$message.success("成功更新");
    },
    updateFailure() {
      this.$message.success("成功失败");
    },
    modalCancle() {
      this.showupdate();
    },
    timeFormatCheck(key) {
      let patt = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
      if (this.updated[key].search(patt) < 0) {
        this.updated[key] = this.oldupdated[key];
        this.$message.error("输入格式为 HH:mm:ss");
      }
    },
    dateFormatCheck(key) {
      let patt = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
      if (this.updated[key].search(patt) < 0) {
        this.updated[key] = this.oldupdated[key];
        this.$message.error("输入格式为 YYYY-MM-DD");
      }
    },
    checkDepartDestin(key1, key2) {
      if (this.updated[key1] == this.updated[key2]) {
        this.updated[key1] = this.oldupdated[key1];
        this.$message.error("出发地和目的地不能相同");
      }
    },
    deleteData(record) {
      this.deleted = record;
      this.isdelete = true;
    },
    deleteOk() {
      this.isdelete = false;
      FlightNet.deleteFlights(this.deleted,this.deleteSuccess.bind(this),this.deleteFailure.bind(this))
    },
    deleteCancle() {
      this.isdelete = false;
    },
    deleteSuccess(){
      this.$message.success("删除成功")
      let did=0;
      let i=0
        for(i=0;i<this.data.length;i++){
          if(this.data[i].flightid==this.updated.flightid){
            did=i;
            break
          }
        }
        this.data.splice(did,1)
    },
    deleteFailure(){
      this.$message.error("删除失败")
    },
    insertFlightBtn(){
      this.flightidDisable=false
      this.modalTitle = "增加航班"
      this.oldupdated=this.data[0]
      let key=Object.keys(this.data[0])
      this.updated={}
      for(let i=0;i<key.length;i++){
        this.$set(this.updated, key[i],this.data[0][key[i]] )
        
      }
      this.updated.flightid=""
      this.showupdate();
    },
    insertFlight(){
      if(this.updated.flightid==""){
        this.$message.error("航班id不能为空")
        return
      }
      FlightNet.insertFlights(this.updated,this.insertFlightSuccess.bind(this),this.insertFlightFailure.bind(this))
    },
    insertFlightSuccess(){
      this.$message.success("成功增加航班")
    },
    insertFlightFailure(){
      this.$message.success("增加航班失败")
    },
    flightsPOI(){
      FlightNet.flightsPOI()
    }
  },
  created() {},
};
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
