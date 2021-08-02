<template>
    <div>
      <a-statistic 
        :value="
          time
        "
        style="margin-right: 10px"
        valueStyle="font-size:15px"
        class="statistic"
      >
        <template #prefix>
            <a-icon type="clock-circle"></a-icon>
        </template>
      </a-statistic>
    </div>
</template>
<script>
import moment from 'moment'
export default{
    name:"Timer",
    data(){
        return{
            time:moment()
        }
    },
    created(){
        setInterval(()=>{
            this.time=moment()
        },1000)
    }
}
</script>
<style scoped>

</style>
