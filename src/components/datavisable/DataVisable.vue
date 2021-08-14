<template>
    <div ref='root'>
        <svg ref='targetSVG'></svg>
    </div>
</template>
<script>
    import fastD3 from '@/visible/fastD3';
    import dataVisableNet from '@/network/dataVisableNet';

    // 创建动态表格
    fastD3.SVG();
    let testing = false;

    function myLog(info) {
        if (testing) {
            console.log(info);
        }
    }

    export default {
        name: "DataVisable",
        methods: {
            getData() {
                // 测试用数据
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
            },
            autoAdd(a) {
                a.forEach((d) => {
                    d.value += Math.floor(Math.random() * 10);
                });
            },
            async days() {
                return dataVisableNet.dayOrders()
                    .then((res) => {
                        let ans = res ? res.data : [];
                        let r = [];
                        ans.forEach((d) => {
                            let o = {
                                'name': d.time,
                                'value': d.number
                            };
                            r.push(o);
                        });
                        return r;
                    }, (e) => {
                        myLog(e);
                        return [];
                    })
                    .catch((e) => {
                        myLog(e);
                        return [];
                    });
            },
            async weeks() {
                return dataVisableNet.weekOrders()
                    .then((res) => {
                        let ans = res ? res.data : [];
                        let r = [];
                        ans.forEach((d) => {
                            let o = {
                                'name': d.time,
                                'value': d.number
                            };
                            r.push(o);
                        });
                        return r;
                    }, (e) => {
                        myLog(e);
                        return [];
                    })
                    .catch((e) => {
                        myLog(e);
                        return [];
                    });
            },
            async topN() {
                return dataVisableNet.planeTopN()
                    .then((res) => {
                        let ans = res ? res.data[0].hotPlanes : [];
                        let r = [];
                        ans.forEach((d) => {
                            let o = {
                                'name': d.course,
                                'value': d.number
                            };
                            r.push(o);
                        });
                        return r;
                    }, (e) => {
                        myLog(e);
                        return [];
                    })
                    .catch((e) => {
                        myLog(e);
                        return [];
                    });
            },
        },
        created() {
            let that = this;
            // todo: 文字修改

            this.$nextTick(async function () {
                let root = that.$refs.root;
                fastD3.SVG(that.$refs.targetSVG, root.offsetWidth, root.offsetHeight);
                let param = {
                    ...fastD3.columnDefault
                };
                // param.sort = (a, b)=>{return b.value-a.value;};
                param.widthPercent = 0.5;
                param.heightPercent = 0.7;
                param.fontSize = 10;
                param.lineHeight = 10;
                param.xOffset = 0.5;
                let col = fastD3.column([], param);

                let weekLine = {
                    ...fastD3.linesDefault
                };
                weekLine.widthPercent = 0.7;
                weekLine.heightPercent = 0.25;
                weekLine.xOffset = 0.1;
                weekLine.yOffset = 0.1;
                weekLine.fontSize = 10;
                weekLine.lineHeight = 10;
                weekLine.lineColor = 'rgba(200,200,200,200)';
                let wl = fastD3.lines([], weekLine);

                let dayLine = {
                    ...fastD3.linesDefault
                };
                dayLine.sort = (a, b) => {
                    return b.value - a.value;
                };
                dayLine.widthPercent = 0.7;
                dayLine.heightPercent = 0.25;
                dayLine.xOffset = 0.1;
                dayLine.yOffset = 0.5;
                dayLine.fontSize = 10;
                dayLine.lineHeight = 10;
                dayLine.lineColor = 'rgba(200,200,200,200)';
                let dl = fastD3.lines([], dayLine);

                let text1Param = {
                    ...fastD3.textDefault
                };
                let text2Param = {
                    ...fastD3.textDefault
                };
                let text3Param = {
                    ...fastD3.textDefault
                };
                text2Param.yOffset = 0.45;
                text3Param.xOffset = 0.55;
                text3Param.yOffset = 0.7;
                let text1 = fastD3.text(``, text1Param);
                let text2 = fastD3.text(``, text2Param);
                let text3 = fastD3.text(``, text3Param);

                text1, text2, text3;

                let cText = () => {
                    text1.cData(`${this.$t('m.weekChartDes')}`);
                    text2.cData(`${this.$t('m.dayChartDes')}`);
                    text3.cData(`${this.$t('m.planeTopNDes')}`);
                }
                let tt = async () => {
                    try {
                        let week = await that.weeks();
                        let day = await that.days();
                        let tN = await that.topN();
                        col.cData(tN || []);
                        wl.cData(week || []);
                        dl.cData(day || []);
                        cText();
                        if (week.length || day.length || tN.length)
                            setTimeout(tt, 1000); // 使其实时更新
                    } catch (e) {
                        myLog(e);
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