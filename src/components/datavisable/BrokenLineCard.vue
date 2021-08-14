<template>
  <div>
    <a-card :bordered="false">
      <a-collapse>
        <a-collapse-panel key="1" header="绘制折线图">
          <div ref="brokenLineCardRoot" class="brokenLineCardRoot"> <svg ref="brokenLineCardtTargetSVG"></svg> </div>
          <!-- <div v-for="item,index in planedata" :key="index">
            <h4>方案{{index}}</h4>
            <h5 v-for="it,ind in item" :key="ind">
              第{{ind+1}}站:{{it}}
            </h5>
          </div> -->
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>
<script>
  import fastD3 from '@/visible/fastD3';
  export default {
    name: "BrokenLineCard",
    props: {
      planedata: []
    },
    created() {
      let that = this;

      function makeChart() {
        // 处理数据
        let data = [];
        for (let plan of that.planedata) {
          let sum = 0;
          let pos = '';
          for (let o of plan) {
            sum += o.price;
            pos += o.flightid;
          }
          data.push({
            name: pos,
            value: +sum,
          });
        }
        // 处理结构
        let linesP = {
          ...fastD3.linesDefault
        };
        linesP.lineColor = 'rgba(200, 200, 200, 200)'
        linesP.fontSize = 7;
        linesP.lineHeight = 10;
        fastD3.lines(data, linesP);
      }

      function wait() {
        if (that.$refs.brokenLineCardtTargetSVG) {
          let root = that.$refs.brokenLineCardRoot;
          let svg = that.$refs.brokenLineCardtTargetSVG;
          fastD3.SVG(svg, root.offsetWidth, root.offsetHeight);
          makeChart();
        } else {
          setTimeout(wait, 1000);
        }
      }
      this.$nextTick(wait);
    }
  };
</script>
<style scoped>
  .brokenLineCardRoot {
    width: 100%;
    height: 50vh;
  }

  svg {
    width: 100%;
    height: 50vh;
  }
</style>