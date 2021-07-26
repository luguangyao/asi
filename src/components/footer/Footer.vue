<template>
    <div class="wrapper">
        <a-row type="flex" justify="center">
            <a-space :size="25">
                <a-button type="primary" ghost><a-icon type="global"></a-icon> {{$t('m.language')}}</a-button>
                <a-button type="primary" ghost><a-icon type="environment"></a-icon>  {{$t('m.position')}}</a-button>
                <a-button type="primary" ghost><a-icon type="dollar"></a-icon> {{$t('m.currency')}}</a-button>
            </a-space>
        </a-row>
        <a-row type="flex" justify="center" style="margin-top:20px">
            <a-space :size="10">
                <a-button type="link" >{{$t('m.intro')}}</a-button>
                <a-button type="link" > {{$t('m.clause')}}</a-button>
                <a-button type="link" > {{$t('m.privicy')}}</a-button>
                <a-button type="link" > {{$t('m.investigate')}}</a-button>
                <a-button type="link" > {{$t('m.opinion')}}</a-button>
                <a-button type="link" > {{$t('m.illustrate')}}</a-button>
            </a-space>
        </a-row>
        <a-row type="flex" justify="center" style="margin-top:20px">
            <a-space :size="10" align="center">
                {{$t('m.currencyWarrning')}}
                <a-button type="link" >{{$t('m.knowMore')}}</a-button>
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
            <h6 style="color:grey"><a-icon type="copyright"/>{{$t('m.copyright')}}</h6>
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