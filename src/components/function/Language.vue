<template>
    <div class="wrapper">
        <a-switch checked-children="zh" un-checked-children="en" :checked="checked" size="default" @change="switchLanguage"/>
    </div>
</template>

<script>
export default{
    name:"Language",
    data(){
        return{
            checked:true
        }
    },
 
    methods:{
        switchLanguage(){
            this.$message.loading(this.$t('m.langSetting'), 1)
            .then(()=>{
                this.$store.commit("switchLanguage",this)
                this.checked=!this.checked
                this.$message.success(this.$t('m.langSetted'), 2.5)
            })
             
        }
    }
}
</script>
<style  scoped>
.wrapper{
    padding: 0px;
    margin: 0px;
}
</style>
