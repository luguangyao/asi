<template>
    <div ref='root'>
        <svg ref='targetSVG'></svg>
    </div>
</template>
<script>
    import fastD3 from '@/visible/fastD3';
    import dataVisable from '@/network/dataVisable';

    // 创建动态表格
    fastD3.SVG();
    let testing = true;
    testing;

    export default {
        name: "DataVisable",
        methods: {
            getData() {
                // 测试用数据
                return [{ name: '1', value: 23 },
                    { name: '2', value: 12 },
                    { name: '3', value: 1 },
                    { name: '4', value: 17 },
                    { name: '5', value: 10 },
                    { name: '6', value: 51 },
                    { name: '13', value: 13 },
                ];
            } ,
            autoAdd (a) {
                a.forEach( (d)=>{
                    d.value += Math.floor( Math.random() * 10);
                });
            },
            async days () {
                return dataVisable.dayOrders()
                    .then((res) =>{
                        let ans = res || [];
                        let r = [];
                        ans.forEach( (d)=>{
                            let o = {'name': d.time, 'value': d.number};
                            r.push(o);
                        });
                        return r;
                    }, () =>{
                        // 可获取错误信息
                        return [];
                    })
                    .catch(() =>{
                        // 可获取错误信息
                        return [];
                    });
            },
            async weeks () {
                return dataVisable.weekOrders()
                    .then((res) =>{
                        let ans = res || [];
                        let r = [];
                        ans.forEach( (d)=>{
                            let o = {'name': d.time, 'value': d.number};
                            r.push(o);
                        });
                        return r;
                    }, () =>{
                        // 可获取错误信息
                        return [];
                    })
                    .catch(() =>{
                        // 可获取错误信息
                        return [];
                    });
            },
            async topN() {
                return dataVisable.planeTopN()
                    .then((res) =>{
                        let ans = res? res[0].hotPlane : [];
                        let r = [];
                        ans.forEach( (d)=>{
                            let o = {'name': d.course , 'value': d.number};
                            r.push(o);
                        });
                        return r;
                    }, () =>{
                        // 可获取错误信息
                        return [];
                    })
                    .catch(() =>{
                        // 可获取错误信息
                        return [];
                    });
            },
        },
        created() {
            let that = this;
            
            this.$nextTick(async function () {
                // let data = that.getData();
                let root = that.$refs.root;
                fastD3.SVG(that.$refs.targetSVG, root.offsetWidth, root.offsetHeight);
                let param = {...fastD3.columnDefault};
                // param.sort = (a, b)=>{return b.value-a.value;};
                param.widthPercent = 0.5;
                param.heightPercent = 0.5;
                param.fontSize = 10;
                param.lineHeight = 10;
                param.xOffset = 0.25;
                let col = fastD3.column([], param);

                let rparam = {...fastD3.pieDefault};
                rparam.widthPercent = 0.25;
                rparam.heightPercent = 0.25;
                rparam.fontSize = 10;
                rparam.lineHeight = 10;
                let pie = fastD3.pie([], rparam);

                let r2param = {...fastD3.pieDefault};
                r2param.sort = (a, b) =>{return b.value - a.value;};
                r2param.widthPercent = 0.25;
                r2param.heightPercent = 0.25;
                r2param.yOffset = 0.25;
                r2param.fontSize = 10;
                r2param.lineHeight = 10;
                let pie2 = fastD3.pie([], r2param);

                let text1Param = {...fastD3.textDefault};
                let text2Param = {...fastD3.textDefault};
                text2Param.yOffset = 0.25;
                let text1 = fastD3.text('周销量', text1Param);
                let text2 = fastD3.text('日销量', text2Param);

                text1, text2;

                // todo: 替换为自动更新数据
                let tt = async () =>{
                    // that.autoAdd(data);
                    try {
                        let week = await that.weeks();
                        let day = await that.days();
                        let tN = await that.topN();
                        col.cData(tN);
                        pie.cData(week);
                        pie2.cData(day);
                        // setTimeout(tt, 2000); // 使其实时更新
                    } catch (e){
                        e.console.log(e);
                    }
                }
                tt();
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