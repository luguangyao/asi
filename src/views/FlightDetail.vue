<template>
    <div class="flightlistwrapper">
        <FlightList/>
        <BrokenLineCard/>
        <FlightList/>
    </div>
</template>
<script>
import FlightList from "@/components/function/FlightList"
import BrokenLineCard from "@/components/function/BrokenLineCard"
export default {
    name:"FlightDetail",
    components:{
        FlightList,
        BrokenLineCard
    }
}
</script>
<style scoped>
.flightlistwrapper{
    width: 100%;
    padding: 30px;
}
.flightlistwrapper >*{
    margin-top: 20px;
}
</style>