<template>
  <div>
    <IndexTop></IndexTop>
    <IndexHeader></IndexHeader>
  </div>
</template>

<script>
import IndexTop from "@/components/header/HomeTop.vue";
import IndexHeader from "@/components/header/HomeHeader";

export default {
  name: "Home",
  components: {
    IndexTop,
    IndexHeader,
  },
};
</script>
