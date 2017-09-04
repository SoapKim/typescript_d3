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
greeter.drawLineChart(lineData,svg,COMMA.Constant.INTERPOLATER.basis);