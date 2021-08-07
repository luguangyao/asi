<template>
  <div>
    <a-card :bordered="false">
      <a-collapse >
        <a-collapse-panel key="1" header="绘制折线图">
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
export default {
  name: "BrokenLineCard",
  props:{
    planedata:[]
  }
};
</script>
<style scoped>
</style>