<template>
    <div ref='root'>
        <svg ref='targetSVG'></svg>
    </div>
</template>
<script>
    import fastD3 from '@/visible/fastD3';

    // 创建动态表格
    fastD3.SVG();

    export default {
        name: "DataVisable",
        methods: {
            getData() {
                // 替换为网络获取
                return [{
                        name: '1',
                        value: 23
                    },
                    {
                        name: '2',
                        value: 12
                    },
                    {
                        name: '3',
                        value: 1
                    },
                    {
                        name: '4',
                        value: 17
                    },
                    {
                        name: '5',
                        value: 10
                    },
                    {
                        name: '6',
                        value: 51
                    },
                    {
                        name: '13',
                        value: 13
                    },
                ];
            } ,
            autoAdd (a) {
                a.forEach( (d)=>{
                    d.value += Math.floor( Math.random() * 10);
                });
            }
        },
        created() {
            let that = this;
            this.$nextTick(function () {
                let root = that.$refs.root;
                fastD3.SVG(that.$refs.targetSVG, root.offsetWidth, root.offsetHeight);
                let param = {...fastD3.columnDefault};
                // param.sort = (a, b)=>{return b.value-a.value;};
                param.widthPercent = 0.5;
                param.heightPercent = 0.5;
                param.fontSize = 10;
                param.lineHeight = 10;
                param.xOffset = 0.25;
                let data = that.getData();
                let col = fastD3.column(data, param);

                let rparam = {...fastD3.pieDefault};
                rparam.widthPercent = 0.25;
                rparam.heightPercent = 0.25;
                rparam.fontSize = 10;
                rparam.lineHeight = 10;
                let pie = fastD3.pie(data, rparam);

                let r2param = {...fastD3.pieDefault};
                r2param.sort = (a, b) =>{return b.value - a.value;};
                r2param.widthPercent = 0.25;
                r2param.heightPercent = 0.25;
                r2param.yOffset = 0.25;
                r2param.fontSize = 10;
                r2param.lineHeight = 10;
                let pie2 = fastD3.pie(data, r2param);

                let text1Param = {...fastD3.textDefault};
                text1Param.yOffset = 0.25;
                let text2Param = {...fastD3.textDefault};
                let text1 = fastD3.text('报表1的名称', text1Param);
                let text2 = fastD3.text('报表2的名称', text2Param);

                text1, text2;

                // todo: 替换为自动更新数据
                let tt = () =>{
                    that.autoAdd(data);
                    col.cData(data);
                    pie.cData(data);
                    pie2.cData(data);

                    setTimeout(tt, 2000);
                }

                setTimeout(tt, 2000);
            });
        }
    }
</script>
<style scoped>
    svg {
        width: 100%;
        height: 100vh;
    }
</style>