<template>
    <div ref='root'>
        <label for="daychoose">{{this.$t('m.selectViewDayTicket')}} : </label>
        <a-date-picker v-model="selectTime" style="width: 60%"></a-date-picker>
        <svg ref='targetSVG'></svg>
    </div>
</template>
<script>
    import fastD3 from '@/visible/fastD3';
    import dataVisableNet from '@/network/dataVisableNet';
    import moment from 'moment'

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
            async days() {
                return dataVisableNet.dayOrders()
                    .then((res) => {
                        let ans = res ? res.data : [];
                        let r = [];
                        ans.forEach((d) => {
                            let o = {
                                'name': `${d.time.split('-')[0].split(':')[0]}-`,
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
                                'name': d.time.split('-').slice(1,3).join('-'),
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
                const wordLength = 5;
                let _l = (wordLength - 1)/2;
                return dataVisableNet.planeTopN()
                    .then((res) => {
                        let ans = res ? res.data[0].hotPlanes : [];
                        let r = [];
                        ans.forEach((d) => {
                            let [_from, _to] = d.course.split('>');
                            _from = _from.slice(0, _l);
                            _to = _to.slice(0, _l);
                            let o = {
                                'name': `${_from}>${_to}`,
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
        data () {
            return {
                selectTime: moment()
            }
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
                param.widthPercent = 0.45;
                param.heightPercent = 0.7;
                param.fontSize = 10;
                param.lineHeight = 10;
                param.xOffset = 0.5;
                param.spacePerColumn = 0.3;
                let col = fastD3.column([], param);

                let weekLine = {
                    ...fastD3.linesDefault
                };
                weekLine.widthPercent = 0.4;
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
                dayLine.widthPercent = 0.4;
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
                    text2.cData(`${this.$t('m.dayChartDes')}: ${that.selectTime.format('YYYY-MM-DD')}`);
                    text3.cData(`${this.$t('m.planeTopNDes')}`);
                }
                let tt = async () => {
                    try {
                        let week = await that.weeks();
                        let day = await that.days(that.selectTime.format('YYYY-MM-DD'));
                        console.log(day)
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