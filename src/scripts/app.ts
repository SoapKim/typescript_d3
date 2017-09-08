// import "../styles/base.scss";
import * as D3 from "d3";
import { COMMA } from "./comma";
// 上面引入样式资源文件
// 业务逻辑代码从这里开始写

import { GreeterD3 } from "./greeter";

const greeter: GreeterD3 = new GreeterD3("this istypescritpt test demo");
let dataset = [50, 43, 120, 87, 99, 167, 142];
let width: number = 500;
let height: number = 800;
let isFont = true;
let color10 = D3.scale.category10();
let color20 = D3.scale.category20();
let continent = ["天宝岩", "武夷山", "青牛", "大金湖", "同安"];
let population = [
    [9000, 870, 3000　, 1000, 5200],
    [3400, 8000　, 2300　, 4922, 374],
    [2000, 2000　, 7700　, 4881, 1050],
    [3000, 8012, 5531, 500, 400],
    [3540, 4310　, 1500, 1900, 300]
];

// 关于绘制条形图
let svg = D3.select("#canvas-frame").append("svg")
    .attr("width", width)
    .attr("height", height);
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
    region: "罗汉松",
    value: [[2000, 11920], [2001, 13170], [2002, 14550], [2003, 16500], [2004, 19440], [2005, 22870],
    [2006, 27930], [2007, 35040], [2008, 45470], [2009, 51050], [2010, 59490]]
}, {
    region: "银杏",
    value: [[2000, 41920], [2001, 43170], [2002, 34550], [2003, 46500], [2004, 49440], [2005, 42870],
    [2006, 47930], [2007, 45040], [2008, 45470], [2009, 41050], [2010, 54490]]
}, {
    region: "水杉",
    value: [[2000, 920], [2001, 3170], [2002, 550], [2003, 500], [2004, 440], [2005, 1100],
    [2006, 1700], [2007, 1680], [2008, 4000], [2009, 4900], [2010, 5100]]
}];
function getExtent(dataset) {
    let yMin = dataset[0].value[0][1];
    let yMax = dataset[0].value[0][1];
    let xMin = dataset[0].value[0][0];
    let xMax = dataset[0].value[0][0];
    for (let i = 0; i < dataset.length; ++i) {
        let xRange = D3.extent(dataset[i].value, (d) => (d[0]));
        let yRange = D3.extent(dataset[i].value, (d) => (d[1]));
        if (yMin > yRange[0]) {
            yMin = yRange[0];
        }
        if (yMax < yRange[1]) {
            yMax = yRange[1];
        }
        if (xMin > xRange[0]) {
            xMin = xRange[0];
        }
        if (xMax < xRange[1]) {
            xMax = xRange[1];
        }
    }
    return [xMin, xMax, yMin, yMax];
}
let extentValue = getExtent(lineData);
let svgLine = D3.select("#lineChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
greeter.drawLineChart(lineData, [extentValue[0], extentValue[1]], [extentValue[2], extentValue[3]], svgLine, COMMA.Constant.INTERPOLATER.basis);
// 
let svgScatter = D3.select("#scatterChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);

greeter.drawScatterCaseChart(scatterDataset, svgScatter, 2000, 5);
//
let svgPie = D3.select("#pieChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
let pieDataset = [["小米", 60.8], ["三星", 58.4], ["联想", 47.3], ["苹果", 46.6], ["华为", 41.3], ["酷派", 40.1], ["其他", 111.5]];
greeter.drawPieChartCase(svgPie, pieDataset, D3.scale.category20(), 10, 100);
//
let svgBar = D3.select("#barChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
// 1. 确定初始数据，创建一个生成正态分布的函数，其中平均值为170，标准差为10
let rand = D3.random.normal(170, 10);
// 定义一个数组，用于保存正态分布生成的数值
let barDataset: any = [];
// 根据正态分布生成100个随机数，插入到数组dataset中
for (let i = 0; i < 100; i++) {
    barDataset.push(rand());
}
let bins = 20;
// console.log(barDataset);
let range = [130, 210];
greeter.drawBarChartCase(svgBar, range, bins, barDataset);
document.getElementById("barRect").onclick = () => greeter.showhideBar.call(greeter);
document.getElementById("barLine").onclick = () => greeter.showhideLine.call(greeter);
//
let svgStrack = D3.select("#strackChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
greeter.drawStackChartCase(svgStrack, lineData, color10, 50, 10, COMMA.StackType.AreaStack);
document.getElementById("stack").onclick = () => greeter.ShowStack.call(greeter);
document.getElementById("stackArea").onclick = () => greeter.ShowStackArea.call(greeter);
//

let svgChord = D3.select("#chordChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
greeter.drawChordChartCase(svgChord, continent, population, color20);
// 
let svgCluster = D3.select("#clusterChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);

greeter.drawClusterTreeChart(svgCluster, "../data/city.json", COMMA.ClusterType.Cluster, 4.5);
document.getElementById("tree").onclick = () => greeter.ShowTree.call(greeter);
document.getElementById("cluster").onclick = () => greeter.ShowCluster.call(greeter);
document.getElementById("circle").onclick = () => greeter.ShowClusterCircle.call(greeter);
// 

let forceNodes = [[0], [1], [2], [3], [4], [5], [6]];
let forceEdges = [{ source: 0, target: 1 },
{ source: 0, target: 2 },
{ source: 0, target: 3 },
{ source: 1, target: 4 },
{ source: 1, target: 5 },
{ source: 1, target: 6 }];
let svgForce = D3.select("#forceChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
greeter.drawForceChart(svgForce, forceNodes, forceEdges, 100, -400, color20, 18);
//
let cities = {
    name: "",
    children: [
        { name: "北京" }, { name: "上海" }, { name: "杭州" },
        { name: "广州" }, { name: "桂林" }, { name: "昆明" },
        { name: "成都" }, { name: "西安" }, { name: "太原" }
    ]
};

let railway = [
    { source: "北京", target: "上海" },
    { source: "北京", target: "广州" },
    { source: "北京", target: "杭州" },
    { source: "北京", target: "西安" },
    { source: "北京", target: "成都" },
    { source: "北京", target: "太原" },
    { source: "北京", target: "桂林" },
    { source: "北京", target: "昆明" },
    { source: "北京", target: "成都" },
    { source: "上海", target: "杭州" },
    { source: "昆明", target: "成都" },
    { source: "西安", target: "太原" }];
let svgBundle = D3.select("#bundleChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
greeter.drawBundleChart(svgBundle, cities, railway, color20, 20);
//
let svgPack = D3.select("#packChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
greeter.drawPackChart(svgPack, "../data/city.json", color10, 20, 5);
//
let svgPartition = D3.select("#paritionChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);
greeter.drawPartitionChart(svgPartition, "../data/city.json", color20);
document.getElementById("parition").onclick = () => greeter.ShowPartition.call(greeter);
document.getElementById("paritioncircle").onclick = () => greeter.ShowPartitionCircle.call(greeter);
//
let svgTreeMap = D3.select("#treeMapChart").append("svg")
    .attr("width", width)
    .attr("height", height * 0.5);

greeter.drawTreeMapChart(svgTreeMap, "../data/citygdp.json", color20);
