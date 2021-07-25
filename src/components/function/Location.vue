<template>
  <div >
    <a-statistic  :value="this.$t('m.mainland')" style="margin-right: 10px" valueStyle="font-size:15px" class="statistic">
      <template #prefix>
        <a-icon type="global" class="location-icon" />
      </template>
    </a-statistic>
  </div>
</template>
<script>
export default {
  name: "Location",
};
</script>
<style scoped>
.statistic{
  font-size: 5px;
}
.location-icon{
    font-size: 20px;
}
</style>