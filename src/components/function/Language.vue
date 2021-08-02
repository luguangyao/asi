<template>
    <div class="wrapper">
        <a-button @click="switchLanguage">{{this.$i18n.locale}}</a-button>
    </div>
</template>

<script>
export default{
    name:"Language",
    data(){
        return{
        }
    },
 
    methods:{
        switchLanguage(){
            this.$message.loading(this.$t('m.langSetting'), 1)
            .then(()=>{
                this.$store.commit("switchLanguage",this)
                this.$message.success(this.$t('m.langSetted'), 2.5)
                this.checked==this.$i18n.locale=='zh-CN'?true:false
            })
        }
    },
    
}
</script>
<style  scoped>
.wrapper{
    padding: 0px;
    margin: 0px;
}
</style>
