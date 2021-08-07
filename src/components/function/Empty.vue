<template>
  <div>
      <a-card-grid style="width: 100%; padding-top:150px; padding-bottom:50px">
            <a-empty></a-empty>
            <a-divider orientation="left">{{$t('m.nodata')}}</a-divider>
            <h5>{{$t('m.nodatasub')}}</h5>
      </a-card-grid>
  </div>
</template>
<script>
export default {
  naem: "Empty",
};
</script>
<style scoped>
</style>
