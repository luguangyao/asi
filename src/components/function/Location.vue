<template>
  <div>
    <a-tooltip>
      <a-statistic
        :value="
          this.$store.state.locationMessage.cid +
          ' ' +
          this.$store.state.locationMessage.cname
        "
        style="margin-right: 10px"
        valueStyle="font-size:15px"
        class="statistic"
      >
        <template #prefix>
          <a-icon type="global" class="location-icon" />
        </template>
      </a-statistic>
      <template slot="title" style="color:white"> 
          cip:{{this.$store.state.locationMessage.cip}}<br/>
          cid:{{this.$store.state.locationMessage.cid}}<br/>
          cname:{{this.$store.state.locationMessage.cname}}
      </template>
    </a-tooltip>
  </div>
</template>
<script>
import lawn from "@/network/LocationAndWeatherNet";
export default {
  name: "Location",
  data() {
    return {};
  },
  methods: {
    getLocation() {
      if (this.$store.locationMessage == undefined)
        lawn.getLocation(this.setLocation.bind(this));
    },
    setLocation(locationMessage) {
      this.$store.commit("setLocation", locationMessage);
    },
  },
  created() {
    this.getLocation();
  },
};
</script>
<style scoped>
.statistic {
  font-size: 5px;
}
.location-icon {
  font-size: 20px;
}

</style>