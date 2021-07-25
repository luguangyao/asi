<template>
    <div class="wrapper">
        <FlightSearch/>
        <Warning/>
        <Destination/>
    </div>
</template>
<script>
import FlightSearch from "@/components/function/FlightSearch"
import Warning from "@/components/function/Warning"
import Destination from "@/components/display/Destination"

export default {
    name:"Flight",
    components:{
        FlightSearch,
        Warning,
        Destination
    }
}
</script>
<style scoped>
.wrapper{
    width: 100%;
    padding: 30px;
}

</style>