<template>
    <div class="wrapper">
        <a-row type="flex" justify="center">
            <a-space :size="25">
                <a-button type="primary" ghost><a-icon type="global"></a-icon> 语言 简体中文</a-button>
                <a-button type="primary" ghost><a-icon type="environment"></a-icon> 位置 {{$t('m.mainland')}}</a-button>
                <a-button type="primary" ghost><a-icon type="dollar"></a-icon> 货币 人民币</a-button>
            </a-space>
        </a-row>
        <a-row type="flex" justify="center" style="margin-top:20px">
            <a-space :size="10">
                <a-button type="link"  >简介</a-button>
                <a-button type="link" >隐私权</a-button>
                <a-button type="link" >条款</a-button>
                <a-button type="link" >参加使用者调查</a-button>
                <a-button type="link" >提供意见</a-button>
                <a-button type="link" >说明中心</a-button>
            </a-space>
        </a-row>
        <a-row type="flex" justify="center" style="margin-top:20px">
            <a-space :size="10" align="center">
                系统显示的货币可能与购买机票时使用的货币不同
                <a-button type="link" >了解详情</a-button>
            </a-space>
        </a-row>
        <a-row type="flex" justify="center" style="margin-top:20px">
            <a-space :size="10">
                <a-button type="link"  ><a-icon type="twitter" style="font-size:35px"></a-icon></a-button>
                <a-button type="link"  ><a-icon type="wechat" style="font-size:35px"></a-icon></a-button>
                <a-button type="link"  ><a-icon type="zhihu" style="font-size:35px"></a-icon></a-button>
                <a-button type="link"  ><a-icon type="github" style="font-size:35px"></a-icon></a-button>
            </a-space>
        </a-row>
        <a-row type="flex" justify="center" style="margin-top:20px">
            <a-col>
            <h6 style="color:grey"><a-icon type="copyright"/>2021 AirSystem All rights reserved</h6>
            </a-col>
        </a-row>
        <div class="background-icon" v-if="iconvisable">
            <a-icon type="yuque" theme="filled" ></a-icon>
        </div>
    </div>
   
</template>
<script>
export default {
    name:"Footer",
    props:{
        iconvisable:{
            type:Boolean,
            default:true
        }
    }
}
</script>
<style scoped>
.wrapper{
    position: relative;
}
.background-icon{
    position: absolute;
    color: blueviolet;
    font-size: 250px;
    top:-30%;
    left: 10%;
    transition:all 0.5s
}
.background-icon:hover{
    color: aqua;
    transform:rotate(20deg);
    transition:all 0.5s
}
</style>