<template>
    <a-card class="root">
        <input :value="dlength" hidden />
        <h1>{{title}}</h1>
        <hr />
        <a-row v-for="item,itemIdx in showStrs" :key="`row${itemIdx}#`">
            <a-col v-for="i,idx in item.child" :key="`${itemIdx}c${idx}`" :span="i.span" :offset="i.offset || 0">
                <UserInfoSwitchData :item.sync='i.data.item' :type='i.data.type' />
            </a-col>
            <a-col :span="24">
                <hr :style="{'display':(item.lineEnd?'block':'none')}" />
            </a-col>
        </a-row>
        <a-row v-for="but,idx in needBut" :key="`${but.name}b${idx}`">
            <a-col :span="but.span || 24" :offset="but.offset || 0">
                <button @click="but.callback(reciveData())" :name="but.name"
                    style=" width:100%;height: 6vh;border: 1px solid;border-radius:5px;">
                    {{$t(but.display)}}</button>
            </a-col>
        </a-row>
    </a-card>
</template>
<script>
    import UserInfoSwitchData from '@/components/function/UserInfoSwitchData';
    const ItemType = {
        Input: 0,
        Password: 1,
        Text: 2,
        Radio: 3,
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
        components: {
            UserInfoSwitchData
        },
        methods: {
            typeCVal (type){
                switch (type.name) {
                    case 'age': // 岁数
                        return (age) =>{return `${age} 岁`;}
                    case 'sex': // 性别
                        return (sex) =>{
                            let char = '未知';
                            if (sex == 'm') char = '男';
                            if (sex == 'f') char = '女';
                            return char;
                        }
                }
                return (v) =>{return v;}
            },
            formData(data) {
                let that = this;
                let contain = lineWidth;
                const _fan = () => {
                    return {
                        child: [],
                        lineEnd: false,
                    }
                }
                let _t = _fan();
                const _add = (item) => {
                    item.cVal = that.typeCVal(item);
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
                        if (item.hidden) return;
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

                if (_t.child.length > 0) {
                    that.showStrs.push(_t);
                }
            },
            getItemType(item) {
                if (item.changeAble) {
                    if (item.needCover){
                        return ItemType.Password;
                    } else if (item.radio){
                        return ItemType.Radio;
                    }
                    return ItemType.Input;
                } else {
                    return ItemType.Text;
                }
            },
            reciveData() {
                let that = this;
                this.showStrs.forEach(item => {
                    let childs = item.child;
                    childs.forEach(i => {
                        let sparn = i.data.item;
                        that.templateData[sparn.name] = sparn.value;
                    });
                });
                return this.templateData;
            }
        },
        data() {
            return {
                templateData: {}, // 需要记录当前的值
                showStrs: [], //展示字符，树结构
                dlength: 0,
            }
        },
        mounted() {
            // 处理数据
            // this.formData(this.showData)sdd
            let that = this;
            const wait = () => {
                if (that.showData) {
                    that.formData(that.showData);
                    that.dlength = that.showData.length;
                } else {
                    setTimeout(wait, 1000);
                }
            }
            wait();
        },
    }
</script>
<style scoped>
</style>