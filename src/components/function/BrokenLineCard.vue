<template>
  <div>
    <a-card :bordered="false">
      <a-collapse >
        <a-collapse-panel key="1" header="This is panel header 1">
          <p>Graph</p>
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>
<script>
export default {
  name: "BrokenLineCard",
};
</script>
<style scoped>
</style>