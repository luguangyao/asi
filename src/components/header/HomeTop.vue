<template>
  <div class="wrapper">
    <a-row type="flex" align="bottom">
      <a-col :span="8">
        <div class="left">
          <language />
        </div>
      </a-col>
      <a-col :span="16">
        <div class="right">
          <Location />
          <LoginRegister />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Language from "@/components/function/Language";
import Location from "@/components/function/Location";
import LoginRegister from "@/components/function/LoginRegister";

export default {
  name: "HomeTop",
  components: {
    Language,
    Location,
    LoginRegister,
  },
};
</script>
<style  scoped>
.wrapper{
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;

}
.left {
  display: flex;
  float: left;
  height: 100%;
}
.right {
  display: flex;
  float: right;
  height: 100%;
  justify-content:center
}
.right >*{
 padding-left: 10px;
}
</style>