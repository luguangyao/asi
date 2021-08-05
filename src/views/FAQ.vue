<template>
  <div class="faqwrapper">
    <a-card :title="$t('m.FAQ')" style="width: 100%" >
      <a-card-grid style="width: 100%; margin:0px;padding:0px" v-for="f,index in FAQ   " :key="index" >
        <a-collapse  :bordered="false">
          <a-collapse-panel key="1"  >
            <template slot="header">
              {{setL(f).title}}
            </template>
            <div v-html="setL(f).content"></div>
          </a-collapse-panel>
        </a-collapse>
      </a-card-grid>
    </a-card>
  </div>
</template>
<script>
import FAQList from "@/common/js/FAQList"
export default {
  name: "FAQ",
  data(){
    return{
      FAQ:FAQList.faq,
    }
  },
  methods:{
    setL(item){
      return FAQList.getFAQ(this.$i18n.locale,item)
    }
  },
  
};
</script>
<style scoped>
.faqwrapper {
  width: 100%;
  padding: 30px;
  min-height: 500px;
}
</style>
