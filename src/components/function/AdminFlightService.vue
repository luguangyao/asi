<template>
  <div>
    <a-collapse defaultActiveKey="admin">
      <a-collapse-panel :header="$t('m.flightSeach')" :key="'admin'">
        <FlightSearch
          displayType="admin"
          @getFlightSearchData="getFlightSearchData"
        />
      </a-collapse-panel>
    </a-collapse>
    <a-collapse defaultActiveKey="admin" >
      <a-collapse-panel :header="$t('m.searchResult')" :key="'admin'">
        <TableShow  ref="table" />
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import FlightSearch from "@/components/function/FlightSearch";
import TableShow from "@/components/function/TableShow";
export default {
  name: "AdminFlightService",
  data() {
    return {
      FlightSearchResult: [],
    };
  },
  components: {
    FlightSearch,
    TableShow,
  },
  methods: {
    getFlightSearchData(data,listData) {
      this.FlightSearchResult = data;
      this.$refs.table.setData(data,listData)
    },
  },
};
</script>
<style scoped>
</style>
