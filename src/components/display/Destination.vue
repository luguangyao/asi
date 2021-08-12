<template>
  <div class="titleContainer">
    <a-card >
      <h5 slot="title" ><strong>從大阪市出發的行程 · 1 位乘客的票價</strong></h5>
      <a-button slot="extra" size="small">探索跟多目的地<a-icon type="select" /></a-button>
      <div>
        <a-row>
            <a-col :span="12" class="col">
                <Card/>
                <Card/>
                <Card/>
            </a-col>
            <a-col :span="12">
                <baidu-map :center="center" :zoom="zoom">
                </baidu-map>
                <!-- <div class="map">地图</div> -->
            </a-col>
        </a-row>
      </div>  
        
    </a-card>
  </div>
</template>
<script>
import Card from "../../components/display/Card.vue"
export default {
    name:"Destination",
    components:{
        Card
    }
};
</script>
<style scoped>
.titleContainer {
  width: 100%;
}
.col >*{
  margin-bottom: 5px;
}
.map{
    width:100%;
    height: auto;
    background-color: grey;
}
</style>
