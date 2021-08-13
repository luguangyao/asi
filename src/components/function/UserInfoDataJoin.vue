<template>
    <a-card class="root">
        <template ></template>
        <a-row v-for="item in showStrs" :key="`row${item.line}#`">
            <a-col v-for="i,idx in item.child" :key="`${item.line}c${idx}`" :span="i.span"></a-col>
            <hr :display="item.lineEnd?'block':'none'"/>
            <!-- todo: 处理项目结构，获取数据 -->
        </a-row>
        <a-row v-for="item,idx in showStrs" :key="`${item.line}#${idx}`" :innerHtml="item.str" />
    </a-card>
</template>
<script>
    export default {
        props: {
            showData: {
                type: [],
            },
            needBut: {
                type: [],
            },
        },
        methods: {
            formData(data) {
                // todo: 处理数据使得data便于被解释
                console.log(data);
            },
            getWantNodeStr(info) {
                // todo: 根据info获取正确的字符串用于显示在界面上
                console.log(info);
            }
        },
        data() {
            return {
                templateData: [], // 需要记录当前的值
                showStrs: [], //展示字符，树结构
            }
        },
        mounted() {
            // 处理数据
            this.templateData;
        },
    }
</script>
<style scoped>
</style>