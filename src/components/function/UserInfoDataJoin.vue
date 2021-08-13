<template>
    <a-card class="root">
        <h1>{{title}}</h1>
        <hr/>
        <a-row v-for="item,itemIdx in showStrs" :key="`row${itemIdx}#`">
            <a-col v-for="i,idx in item.child" :key="`${itemIdx}c${idx}`" 
                :span="i.span" :offset="i.offset || 0">
                <UserInfoSwitchData :item='i.data.item' :type='i.data.type'/>
            </a-col>
            <a-col :span="24">
                <hr :style="{'display':(item.lineEnd?'block':'none')}" />
            </a-col>
        </a-row>
        <a-row v-for="but,idx in needBut" :key="`${but.name}b${idx}`">
            <button :value="but.name" @click="but.callback"/>
        </a-row>
        <!-- todo: 按钮渲染-->
    </a-card>
</template>
<script>
    import UserInfoSwitchData from '@/components/function/UserInfoSwitchData';
    const ItemType = {
        Input: 0,
        Text: 1,
    }
    const lineWidth = 24;
    export default {
        props: {
            showData: {
                type: [],
            },
            needBut: {
                type: [],
            },
            title: {
                type: String,
            }
        },
        components:{
            UserInfoSwitchData
        },
        methods: {
            formData(data) {
                // todo: 处理数据使得data便于被解释
                console.log(data);
                let that = this;
                let contain = lineWidth;
                const _fan = () =>{
                    return {
                        child: [],
                        lineEnd: false,
                    }
                }
                let _t = _fan();
                const _add = (item) =>{
                    _t.child.push({
                        span: item.span,
                        offset: item.offset,
                        data: {
                            item,
                            type: that.getItemType(item),
                        },
                    });
                }
                data.forEach((item) => {

                    if (item.isLine) {
                        _t.lineEnd = true;
                        that.showStrs.push(_t);
                        _t = _fan();
                        contain = lineWidth;
                    } else {
                        item.name && (that.templateData[item.name] = item.value);
                        if (item.enter || item.span && contain >= item.span) {
                            contain -= item.span;
                            _add(item);
                        } else {
                            contain = lineWidth;
                            that.showStrs.push(_t);
                            _t = _fan();
                            item.span = lineWidth;
                            _add(item);
                        }
                    }
                });

                if (_t.child.length > 0){
                    that.showStrs.push(_t);
                }
                console.log(that.showStrs)
            },
            getItemType(item) {
                // todo: 根据info获取正确的字符串用于显示在界面上
                console.log(item);
                if (item.changeAble){
                    return ItemType.Input;
                } else {
                    return ItemType.Text;
                }
            }
        },
        data() {
            return {
                templateData: {}, // 需要记录当前的值
                showStrs: [], //展示字符，树结构
            }
        },
        mounted() {
            // 处理数据
            // this.formData(this.showData);
            let test = [{
                name: 'fname',
                display: 'fname',
                changeAble: false,
                value: 4,
            },{
                isLine: true,
            }, {
                name: 'dname',
                display: 'lname',
                changeAble: true,
                value: 5,
                span: 6,
            },{
                name: 'xname',
                display: 'xname',
                changeAble: false,
                value: 6,
                span: 12,
                offset: 1,
            }];
            this.formData(test)
            console.log(this.templateData)
        },
    }
</script>
<style scoped>
</style>