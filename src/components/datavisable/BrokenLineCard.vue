<template>
  <div>
    <a-card :bordered="false">
      <a-collapse >
        <a-collapse-panel key="1" header="绘制折线图">
          <div ref="brokenLineCardRoot"> <svg ref="brokenLineCardtTargetSVG"></svg> </div>
          <div v-for="item,index in planedata" :key="index">
            <h4>方案{{index}}</h4>
            <h5 v-for="it,ind in item" :key="ind">
              第{{ind+1}}站:{{it}}
            </h5>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>
<script>
// import fastD3 from '@/visible/fastD3';
// bug: 未正确获取节点
export default {
  name: "BrokenLineCard",
  props:{
    planedata:[]
  },
  created () {
    let that = this;

    function wait() {
      if (that.$refs && that.$refs.length > 0) {
        let root = that.$refs;
        console.log(root);
        // fastD3.SVG(that.$refs.targetSVG, root.offsetWidth, root.offsetHeight);
        // console.log(that.planedata);
      } else {
        setTimeout(wait, 1000);
        console.log('wait');
      }
    }
    this.$nextTick(wait);
  }
};
</script>
<style scoped>
</style>