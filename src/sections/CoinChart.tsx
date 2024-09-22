import { ReactNode, useContext, useEffect, useRef } from "react";
import "../styles/Coinchart.css";
import * as echarts from "echarts";
import { Context } from "../context/State";
import { getChartViewMinMax, getCurrency, getIntervalX, getIntervalY } from "../context/utils";

export default function CoinChart(): ReactNode {
    const chartRef = useRef<HTMLDivElement>(null);
    const context = useContext(Context);

    useEffect(() => {
        var myChart = echarts.init(chartRef.current as HTMLDivElement, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });

        var option;
        
        let date = context?.chartData?.prices?.map((price: any) => {
            return new Date(price[0]);
        });
        let data = context?.chartData?.prices?.map((price: any) => {
            return Number(price[1]).toFixed(2);
        });

        option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (args: any[]) {
                    var value = args[0];
                    var axisValue = new Date(value.axisValue).toDateString();
                    var currency = getCurrency(context);
                    var price = Number(value.value);
                    return `<strong>${axisValue}</strong><br />${value.marker} <b>${currency + new Intl.NumberFormat(currency === '$' ? 'en-US' : 'hi-IN').format(
                        Number(currency === '$' ? Number(price).toFixed(2) : Math.round(price))
                    )}</b>`;
                },
            },
            title: {
                left: 'center',
                show: false
            },
            toolbox: {
                feature: {
                    restore: {
                        show: false
                    },
                    dataZoom: {
                        show: false
                    },
                    dataReset: {
                        show: false
                    },
                    saveAsImage: {
                        show: false
                    }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date,
                axisPointer: {
                    label: {
                        show: false
                    }
                },
                axisLabel: {
                    interval: getIntervalX(context),
                    show: true,
                    formatter: function (value: string, index: number) {
                        var date = new Date(value);
                        if (context.chartTimePeriod == 365) {
                            return date.toDateString().split(" ")[1];
                        } else if (context.chartTimePeriod == 30) {
                            return date.getDate() + "/" + date.getMonth();
                        } else if (context.chartTimePeriod == 7) {
                            return date.getDate();
                        } else {
                            return date.toString().split(" ")[4].split(":").slice(0, 2).join(":");
                        }
                    }
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: false,
                axisPointer: {
                    label: {
                        show: false
                    }
                },
                min: function (value: any) {
                    return value.min - (value.min * getChartViewMinMax(context.chartTimePeriod) / 100);
                },
                max: function (value: any) {
                    return Number(value.max + (value.max * getChartViewMinMax(context.chartTimePeriod) / 100)).toFixed(2);
                },
                axisLabel: {
                    showMinLabel: false,
                    showMaxLabel: true,
                },
                interval: getIntervalY(context)
            },
            series: [
                {
                    name: 'Price',
                    type: 'line',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            },
                            {
                                offset: 0.5,
                                color: 'rgb(255, 70, 131)'
                            }
                        ])
                    },
                    data: data
                }
            ]
        };

        myChart.setOption(option);

        window.addEventListener('resize', () => {
            myChart.resize()
        });
    }, [context.chartData]);


    return (
        <div className="coinchart-main">
            <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
        </div>
    )
}