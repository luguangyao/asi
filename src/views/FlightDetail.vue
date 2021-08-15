<template>
    <div class="flightlistwrapper">
        <BrokenLineCard :planedata="this.total" ref="blc"/>
        <FlightList :planedata="this.total" @sortevent="sort"/>
    </div>
</template>
<script>
import FlightList from "@/components/function/FlightList"
import BrokenLineCard from "@/components/datavisable/BrokenLineCard"
import PlaneNet from '@/network/PlaneNet'
import Vue from 'vue'
import moment from 'moment'
export default {
    name:"FlightDetail",
    components:{
        FlightList,
        BrokenLineCard
    },
    data(){
        return{
            selectedData:{},
            flightChangetime:'0',
            noChange:[],
            changeOne:[],
            changeTwo:[],
            total:[],
            default:{
                "flightid": "", "departure": "", "destination": "", "dtime": "", "atime": "", "price": "", "model": "", "sales": "", "seatall": "", "airline": "", "distime": "" 
            }
        }
    },
    methods:{
        searchFlightData(){
            if(this.flightChangetime=='2'){
                PlaneNet.changeTwice(this.selectedData,this.changeTwoSuccess)
            }   
            if(this.flightChangetime=='1'||this.flightChangetime=='2'){
                PlaneNet.changeOnce(this.selectedData,this.changeOneSuccess)
            }
            PlaneNet.queryFlights(this.selectedData,this.noChangeSuccess.bind(this))
        },
        noChangeSuccess(result){
            this.$message.success("搜索成功!!")
            this.noChange=result
            this.noChange.forEach(value=>{
                this.total.push([value])
            })
        },
        changeOneSuccess(result){
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                let project=[]
                for(let i=0;i<2;i++){
                    project.push(this.default)
                }
                this.total.push(project)
                let that=this
                setTimeout(()=>{
                    PlaneNet.checkFlightInfo(element.flight1,that.setProject.bind(that,project,0))
                    PlaneNet.checkFlightInfo(element.flight2,that.setProject.bind(that,project,1))
                },400*index)
                
            }
        },
        changeTwoSuccess(result){
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                let project=[]
                for(let i=0;i<3;i++){
                    project.push(this.default)
                }
                this.total.push(project)
                
                let that=this
                setTimeout(()=>{
                    PlaneNet.checkFlightInfo(element.flight1,that.setProject.bind(that,project,0))
                    PlaneNet.checkFlightInfo(element.flight2,that.setProject.bind(that,project,1))
                    PlaneNet.checkFlightInfo(element.flight3,that.setProject.bind(that,project,2))
                },400*index)
            }
        },
        setProject(project,index,data){
            Vue.set(project,index,data)
            this.$refs.blc.cData();
        },
        sort(t){
            switch(t){
                case 1:
                    this.total.sort((a,b)=>{
                        let p1=0
                        a.forEach(value=>{
                            p1+=Number(value.price)
                        })
                        let p2=0
                        b.forEach(value=>{
                            p2+=Number(value.price)
                        })
                        if(p1>p2){return 1}
                        else if(p1==p2){return 0}
                        else return -1
                    })
                    break
                case 2:
                    this.total.sort((a,b)=>{
                        if(a.length>b.length){return 1}
                        else if(a.length>b.length){return 0}
                        else return -1
                    })
                    break
                case 3:
                    this.total.sort((a,b)=>{
                        let ta1=moment(a[0].dtime,"HH:mm:ss")
                        let ta2=moment(a[a.length-1].atime,"HH:mm:ss")
                        let t1=ta2.diff(ta1)
                        let tb1=moment(b[0].dtime,"HH:mm:ss")
                        let tb2=moment(b[b.length-1].atime,"HH:mm:ss")
                        let t2=tb2.diff(tb1)
                        if(t1>t2){return 1}
                        else if(t1==t2){return 0}
                        else return -1
                    })
                    break
            }
        }
    },
    created(){
        if(this.$route.params.selectedData==undefined){
            this.$router.push("/other/flight")
        }
        else{
            this.selectedData=this.$route.params.selectedData
            this.flightChangetime=this.$route.params.flightChangetime
            this.searchFlightData()
        }
        
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