//import "../styles/base.scss";
import * as D3 from "d3";
import { COMMA } from "./comma";
// 上面引入样式资源文件
// 业务逻辑代码从这里开始写

import { GreeterD3 } from "./greeter";

const greeter: GreeterD3 = new GreeterD3("this istypescritpt test demo");
let bardataset = [50, 43, 120, 87, 99, 167, 142];
let width: number = 600;
let height: number = 800;
let baseContain = D3.select("#canvas-frame");
let svg = baseContain.append("svg")
.attr("width", width)
.attr("height", height);
let isFont = true;

// 关于绘制条形图
greeter.drawBarChart(bardataset, svg, isFont);
document.getElementById("sort").onclick= ()=>greeter.sortBar.call(greeter);
document.getElementById("add").onclick=()=> greeter.addData.call(greeter);
// 关于坐标轴
let ticks:number;
let tickFormat:string;
let innerTick:number;
let outerTick:number=5;

greeter.drawAxisTicks(svg, [0, 10], [0, 300],ticks,tickFormat,innerTick,outerTick,COMMA.ScaleType.Linear,null, COMMA.Constant.ORINET.bottom, 0, 0);
greeter.drawAxisTicks(svg, [0.01,1], [0,500],ticks,tickFormat,innerTick,outerTick,COMMA.ScaleType.Log,null, COMMA.Constant.ORINET.bottom, 0, 20);
greeter.drawAxisTicks(svg, [0,1], [0,500],ticks,tickFormat,innerTick,outerTick,COMMA.ScaleType.Pow,[2], COMMA.Constant.ORINET.bottom, 0, 40);
let xAxisWidth = 200;
let yAxisHeight = 200;
let scatterDataset=[[0.5,0.5],[0.7,0.8],[0.4,0.9],[0.11,0.32],[0.88,0.25],[0.75,0.12],[0.5,0.1],[0.2,0.3],[0.4,0.1],[0.6,0.7]];
let radius = 5;
greeter.drawScatterChart(svg, xAxisWidth, yAxisHeight, scatterDataset, radius);