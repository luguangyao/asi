<template>
  <div>
    <a-card :bordered="false" headStyle="border:0px; margin:0px">
      <div slot="title" style="padding:0px;maring:0px" class="title" >
        <h3 >最佳去程航班</h3>
        <h5 >一人乘坐票价,包含关税</h5>
      </div>
      <a-button slot="extra" type="primary" :bordered="false"> 排序依据<a-icon type="swap" style="transform: rotate(90deg);" /></a-button>
      <div>
        <a-collapse  :accordion="true" expandIconPosition="right">
          <a-collapse-panel v-for="i in [1,2,3,4,5]" :key="i" >
            <template slot="header">
              <h4>下午4:00 - 5:00</h4>
              <h6>捷信日本航空</h6>
            </template>
            <a-card>
              <a-timeline>
                <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
                <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
              </a-timeline>
            </a-card>
          </a-collapse-panel>
          
        </a-collapse>
      </div>
    </a-card>
  </div>
</template>
<script>
export default {
  name: "FlightList",
  data() {
    return {
      
    }
  },
};
</script>
<style scoped>
.title >*{
  padding: 0px;
  margin: 0px;
}

</style>