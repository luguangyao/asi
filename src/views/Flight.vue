<template>
    <div class="wrapper">
        <PlaneSearch :showdetail="true"/>
        <Warning/>
        <Destination/>
    </div>
</template>
<script>
import PlaneSearch from "@/components/plane/PlaneSearch"
import Warning from "@/components/function/Warning"
import Destination from "@/components/display/Destination"

export default {
    name:"Flight",
    components:{
        PlaneSearch,
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