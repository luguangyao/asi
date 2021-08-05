<template>
  <div class="payfinishwrapper">
    <a-result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.">
      <template #extra>
        <a-button key="console" type="primary"> Go Console </a-button>
        <a-button key="buy"> Buy Again </a-button>
      </template>
    </a-result>
    <div class="paymethod">
      <a-card title="选择支付方式">
        <a-card-grid style="width: 50%; text-align: center">
          微信支付
        </a-card-grid>
        <a-card-grid style="width: 50%; text-align: center">
          银行卡支付
        </a-card-grid>
        <a-card-grid style="width: 100%; text-align: center">
          确认
        </a-card-grid>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "PayFinish",
};
</script>
<style scoped>
.payfinishwrapper{
    background-color: white;
}
</style>
