// 引入three.js
import * as D3 from "d3";
import { AreaChart } from "./chart-area";
import { ArcChart } from "./chart-arc";
import { AxisChart } from "./axis-scale";
import { BarChart } from "./chart-bar";
import { BundleChartCase } from "./chart-case-bundle";
import { ChordChartCase } from "./chart-case-chord";
import { ClusterTreeChartCase } from "./chart-case-cluster";
import { COMMA } from "./comma";
import { ForceChartCase } from "./chart-case-force";
import { HistogramChartCase } from "./chart-case-histogram";
import { LineChartCase } from "./chart-case-line";
import { PackChartCase } from "./chart-case-pack"
import { PartitionChartCase } from "./chart-case-partition";
import { PieChartCase } from "./chart-case-pie";
import { ScatterChart } from "./chart-scatter";
import { ScatterChartCase } from "./chart-case-scatter";
import { StackChartCase } from "./chart-case-stack";
import { TreeMapChartCase } from "./chart-case-treemap";

export class GreeterD3 {
  private barChart: BarChart;
  private axisChart: AxisChart;
  private scatterChart: ScatterChart;
  private areaChart: AreaChart;
  private arcChart: ArcChart;
  private chartBarCase: HistogramChartCase;
  private stackBarCase: StackChartCase;
  private clusterTree: ClusterTreeChartCase;
  private partition: PartitionChartCase;
  private dataset: any;
  private index: number = 0.0;
  constructor(public greeting: string) {
  }

  public drawBarChart(dataset: any, contain: any, isFont: boolean) {
    this.index++;
    this.dataset = dataset;
    let rectStep: number = 8;
    let rectWidth: number = 30;
    let fontSize: any = 14;
    let padding: any = { top: 0, right: 0, bottom: 0, left: 50 };
    this.barChart = new BarChart(this.dataset, contain, padding);
    this.barChart.BarChart(rectStep, rectWidth);
    if (isFont) {
      this.barChart.appendText();
    }
  }
  public sortBar() {
    this.dataset.sort(D3.ascending);
    this.barChart.update();
  }

  public addData() {
    this.dataset.push(Math.floor(Math.random() * 200));
    this.barChart.update();
  }

  public drawAxisTicks(contain: any, domain: any, range: any,
    ticks: number, tickFormat: string, innerTick: number, outerTick: number,
    type: COMMA.ScaleType, value: any, orient: string, x: number, y: number) {
    if (!this.axisChart) {
      this.axisChart = new AxisChart();
    }
    let scale = this.axisChart.Scale(domain, range, type, value);
    this.axisChart.AxisChart(contain, ticks, tickFormat, innerTick, outerTick,
      scale, orient, x, y);
  }
  public drawAxisTickValues(contain: any, domain: any, range: any,
    tickValues: any, tickFormat: string, innerTick: number, outerTick: number,
    type: COMMA.ScaleType, value: any, orient: string, x: number, y: number) {
    if (!this.axisChart) {
      this.axisChart = new AxisChart();
    }
    let scale = this.axisChart.Scale(domain, range, type, value);
    this.axisChart.AxisChartTickValues(contain, tickValues, tickFormat, innerTick,
      outerTick, scale, orient, x, y);
  }
  public drawScatterChart(contain: any, xAxisWidth: number, yAxisHeight: number, dataset: any, radius: number) {
    let xScale = D3.scale.linear()
      .domain([0, (1.2 * D3.max(dataset, (d) => (d[0])))])
      .range([0, xAxisWidth]);
    let yScale = D3.scale.linear()
      .domain([0, 1.2 * D3.max(dataset, (d) => (d[1]))])
      .range([0, yAxisHeight]);
    this.index++;
    let padding: any = { top: 0, right: 0, bottom: contain.attr("height") / this.index, left: 50 };
    this.scatterChart = new ScatterChart(contain, padding);
    this.scatterChart.ScatterChart(dataset, radius, xScale, yScale);
  }

  public drawAreaChart(dataset: any, contain: any) {
    let strokeWidth: number;
    this.index++;
    let padding: any = { top: 0, right: 0, bottom: contain.attr("height") / this.index, left: 50 };
    this.areaChart = new AreaChart(contain, padding);
    this.areaChart.AreaChart(dataset, COMMA.Constant.ORINET.bottom, COMMA.Constant.INTERPOLATER.basis);
  }

  public drawArcChart(dataset: any, contain: any, innerRadius: number, outerRadius: number) {
    this.index++;
    let padding: any = { top: 0, right: 50, bottom: contain.attr("height") / this.index + 100, left: 0 };
    let strokeWidth: number;
    let fontSize: number = 14;
    let fill = D3.scale.category10();
    this.arcChart = new ArcChart(contain, padding);
    this.arcChart.ArcChart(dataset, innerRadius, outerRadius,fill);
  }

  public drawLineChart(dataset: any, xRange: any, yRange: any, contain: any, interprolate: string) {
    let colors = [D3.rgb(0, 0, 255), D3.rgb(0, 255, 0)];
    let fun = (d, i) => (colors[i]);
    this.index++;
    let padding: any = { top: 0, right: 0, bottom: 50, left: 50 };
    let lineChartCase: LineChartCase = new LineChartCase(contain, padding);
    let strokeWidth = 1;
    lineChartCase.LineChartCase(dataset, xRange, yRange, fun, interprolate);
  }
  public drawScatterCaseChart(dataset: any, contain: any, duration: any, radius: any) {
    this.index++;
    let padding: any = { top: 0, right: 0, bottom: 50, left: 50 };
    let yMin = dataset[0][1];
    let yMax = dataset[0][1];
    let xMin = dataset[0][0];
    let xMax = dataset[0][0];
    for (let i = 0; i < dataset.length; ++i) {
      let xRange = D3.extent(dataset[i], (d) => (d[0]));
      let yRange = D3.extent(dataset[i], (d) => (d[1]));
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
    let scatterChartCase: ScatterChartCase = new ScatterChartCase(contain, padding);
    scatterChartCase.ScatterChartCase(dataset, [0, 1], [0, 1], duration, radius);
  }
  public drawPieChartCase(contain: any, dataset: any, color: any, innerRadius: number, outerRadius: number) {
    let padding: any = { top: 0, right: 0, bottom: 50, left: 50 };
    let pieChartCase: PieChartCase = new PieChartCase(contain, padding);
    let x = contain.attr("width") * 0.5;
    let y = contain.attr("height") * 0.5;
    let arcAngle = [Math.PI * 0.2, Math.PI * 1.5];
    pieChartCase.PieChart(dataset, arcAngle, innerRadius, outerRadius, color, x, y);
    let sum = D3.sum(dataset, (d) => (d[1]));
    function percent(d) {
      let tm = Number(d.value) / sum * 100;
      return tm.toFixed(1) + "%";
    }
    pieChartCase.appendText(COMMA.Constant.TEXT_ANCHOR.middle, percent, 14);
    function direct(d) {
      return d.data[0];
    }
    pieChartCase.appendDirectText(direct);
  }

  public drawBarChartCase(contain: any, range: any, bins: any, dataset: any) {
    let padding: any = { top: 30, right: 30, bottom: 30, left: 30 };
    this.chartBarCase = new HistogramChartCase(contain, padding);
    this.chartBarCase.HistogramCaseChart(dataset, range, bins);
  }
  public showhideBar() {
    this.chartBarCase.showRect();
  }
  public showhideLine() {
    this.chartBarCase.showLine();
  }
  public drawStackChartCase(contain: any, dataset: any, color: any, labelHeight: any, radius: any, stackType: COMMA.StackType) {
    let padding: any = { top: 30, right: 50, bottom: 30, left: 50 };
    this.stackBarCase = new StackChartCase(contain, padding);
    this.stackBarCase.StackChart(dataset, stackType, color);
    this.stackBarCase.appendLabel(labelHeight, radius);
  }
  public ShowStack() {
    this.stackBarCase.updateStackType(COMMA.StackType.Stack);
  }
  public ShowStackArea() {
    this.stackBarCase.updateStackType(COMMA.StackType.AreaStack);
  }
  public drawChordChartCase(contain: any, domain: any, range: any, color: any) {
    let padding: any = { top: 30, right: 30, bottom: 30, left: 50 };
    let chordChartCase: ChordChartCase = new ChordChartCase(contain, padding);
    let pad = 0.03;
    let sort = D3.ascending;
    chordChartCase.ChordChart(domain, range, pad, sort, color);
  }
  public drawClusterTreeChart(contain: any, data: string, type: COMMA.ClusterType, radius: number) {
    let padding: any = { top: 30, right: 80, bottom: 30, left: 30 };
    this.clusterTree = new ClusterTreeChartCase(contain, padding);
    this.clusterTree.ClusterTree(data, type, radius);
  }
  public ShowTree() {
    this.clusterTree.updateClusterType(COMMA.ClusterType.Tree);
  }
  public ShowCluster() {
    this.clusterTree.updateClusterType(COMMA.ClusterType.Cluster);
  }
  public ShowClusterCircle() {
    this.clusterTree.updateClusterType(COMMA.ClusterType.Circle);
  }

  public drawForceChart(contain: any, domain: any, range: any, linkDis: number, charge: number,
    color: any, radius: number) {
    let padding: any = { top: 30, right: 30, bottom: 30, left: 50 };
    let forceChartCase: ForceChartCase = new ForceChartCase(contain, padding);
    forceChartCase.ForceChartCase(domain, range, linkDis, charge, color, radius);
  }
  public drawBundleChart(contain: any, domain: any, range: any, color: any,
    radius: number) {
    let padding: any = { top: 60, right: 60, bottom: 60, left: 60 };
    let bundleChartCase: BundleChartCase = new BundleChartCase(contain, padding);
    bundleChartCase.BundleChartCase(domain, range, color, radius);
  }
  public drawPackChart(contain: any, data: string, color: any, radius: number, padd: number) {
    let padding: any = { top: 30, right: 30, bottom: 30, left: 50 };
    let packChartCase = new PackChartCase(contain, padding);
    packChartCase.PackChartCase(data, color, radius, padd);
  }
  public drawPartitionChart(contain: any, data: string, color: any) {
    let padding: any = { top: 30, right: 30, bottom: 30, left: 50 };
    this.partition = new PartitionChartCase(contain, padding);
    this.partition.PartitionChartCase(data, color, COMMA.PartitionType.Partition);
  }
  public ShowPartition() {
    this.partition.updateParitionType(COMMA.PartitionType.Partition);
  }
  public ShowPartitionCircle() {
    this.partition.updateParitionType(COMMA.PartitionType.Circle);
  }
  public drawTreeMapChart(contain: any, data: string, color: any) {
    let padding: any = { top: 30, right: 30, bottom: 30, left: 50 };
    let treeMapChartCase: TreeMapChartCase = new TreeMapChartCase(contain, padding);
    treeMapChartCase.TreeMapChartCase(data, color);
  }
};
