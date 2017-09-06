//import "../styles/base.scss";
import * as D3 from "d3";
import { COMMA } from "./comma";
// 上面引入样式资源文件
// 业务逻辑代码从这里开始写

import { GreeterD3 } from "./greeter";

const greeter: GreeterD3 = new GreeterD3("this istypescritpt test demo");
let dataset = [50, 43, 120, 87, 99, 167, 142];
let width: number = 600;
let height: number = 800;
let svg = D3.select("#canvas-frame").append("svg")
    .attr("width", width)
    .attr("height", height);
let svgLine = D3.select("#lineChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
let svgScatter = D3.select("#scatterChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
let svgPie = D3.select("#pieChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
let svgBar = D3.select("#barChart").append("svg")
    .attr("width", 500)
    .attr("height", 500);

let isFont = true;

// 关于绘制条形图
greeter.drawBarChart(dataset, svg, isFont);
document.getElementById("sort").onclick = () => greeter.sortBar.call(greeter);
document.getElementById("add").onclick = () => greeter.addData.call(greeter);
// 关于坐标轴
let ticks: number;
let tickFormat: string;
let innerTick: number;
let outerTick: number = 5;

greeter.drawAxisTicks(svg, [0, 10], [0, 300], ticks, tickFormat, innerTick, outerTick, COMMA.ScaleType.Linear, null, COMMA.Constant.ORINET.bottom, 50, 0);
greeter.drawAxisTicks(svg, [0.01, 1], [0, 500], ticks, tickFormat, innerTick, outerTick, COMMA.ScaleType.Log, null, COMMA.Constant.ORINET.bottom, 50, 20);
greeter.drawAxisTicks(svg, [0, 1], [0, 500], ticks, tickFormat, innerTick, outerTick, COMMA.ScaleType.Pow, [2], COMMA.Constant.ORINET.bottom, 50, 40);
let xAxisWidth = 200;
let yAxisHeight = 200;
let scatterDataset = [[0.5, 0.5], [0.7, 0.8], [0.4, 0.9], [0.11, 0.32], [0.88, 0.25], [0.75, 0.12], [0.5, 0.1], [0.2, 0.3], [0.4, 0.1], [0.6, 0.7]];
let radius = 5;
greeter.drawScatterChart(svg, xAxisWidth, yAxisHeight, scatterDataset, radius);
greeter.drawAreaChart(dataset, svg);
//
let arcDataset = [{ startAngle: 0, endAngle: Math.PI * 0.6 }, { startAngle: Math.PI * 0.6, endAngle: Math.PI },
{ startAngle: Math.PI, endAngle: Math.PI * 1.7 }, { startAngle: Math.PI * 1.7, endAngle: Math.PI * 2 }];
greeter.drawArcChart(arcDataset, svg, 15, 100);
//
let lineData = [{
    region: "china",
    value: [[2000, 11920], [2001, 13170], [2002, 14550], [2003, 16500], [2004, 19440], [2005, 22870],
    [2006, 27930], [2007, 35040], [2008, 45470], [2009, 51050], [2010, 59490]]
}, {
    region: "japan",
    value: [[2000, 41920], [2001, 43170], [2002, 34550], [2003, 46500], [2004, 49440], [2005, 42870],
    [2006, 47930], [2007, 45040], [2008, 45470], [2009, 41050], [2010, 54490]]
}];
greeter.drawLineChart(lineData, svgLine, COMMA.Constant.INTERPOLATER.basis);
// 
greeter.drawScatterCaseChart(scatterDataset, svgScatter, 2000, COMMA.Constant.COLOR.black);
//
let pieDataset = [["小米", 60.8], ["三星", 58.4], ["联想", 47.3], ["苹果", 46.6], ["华为", 41.3], ["酷派", 40.1], ["其他", 111.5]];

greeter.drawPieChartCase(svgPie, pieDataset, D3.scale.category20(), 10, 100);
//
//1. 确定初始数据	
//创建一个生成正态分布的函数，其中平均值为170，标准差为10
let rand = D3.random.normal(170, 10);
//定义一个数组，用于保存正态分布生成的数值
let barDataset: any = [];
//根据正态分布生成100个随机数，插入到数组dataset中
for (let i = 0; i < 100; i++) {
    barDataset.push(rand());
}
let bins= 20;
//console.log(barDataset);
let range=[130,210];
greeter.drawBarChartCase(svgBar,range,bins,barDataset);
document.getElementById("barRect").onclick = () => greeter.showhideBar.call(greeter);
document.getElementById("barLine").onclick = () => greeter.showhideLine.call(greeter);