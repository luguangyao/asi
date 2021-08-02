<template>
  <div class="faqwrapper">
    <a-card :title="$t('m.FAQ')" style="width: 100%" >
      <a-card-grid style="width: 100%; margin:0px;padding:0px" >
        <a-collapse  :bordered="false">
          <a-collapse-panel key="1" header="This is panel header 1">
            <p>text</p>
          </a-collapse-panel>
        </a-collapse>
      </a-card-grid>
      <a-card-grid style="width: 100%;  margin:0px;padding:0px">
        <a-collapse  :bordered="false">
          <a-collapse-panel key="1" header="This is panel header 1">
            <p> text</p>
          </a-collapse-panel>
        </a-collapse>
      </a-card-grid>
      <a-card-grid style="width: 100%;  margin:0px;padding:0px">
        <a-collapse  :bordered="false">
          <a-collapse-panel key="1" header="This is panel header 1">
            <p> text </p>
          </a-collapse-panel>
        </a-collapse>
      </a-card-grid>
      <a-card-grid style="width: 100%; margin:0px;padding:0px">
        <a-collapse :bordered="false">
          <a-collapse-panel key="1" header="This is panel header 1">
            <p>text</p>
          </a-collapse-panel>
        </a-collapse>
      </a-card-grid>
    </a-card>
  </div>
</template>
<script>
export default {
  name: "FAQ",
};
</script>
<style scoped>
.faqwrapper {
  width: 100%;
  padding: 30px;
  min-height: 500px;
}
</style>
