// 引入three.js
import * as D3 from "d3";
import { BarChart } from "./chart-bar";
import { COMMA } from "./comma";
import { AxisChart } from "./axis-scale";
import { ScatterChart } from "./chart-scatter";
import { AreaChart } from "./chart-area";
import { ArcChart } from "./chart-arc";
import { LineChartCase } from "./chart-case-line";
import { ScatterChartCase } from "./chart-case-scatter";
import { PieChartCase } from "./chart-case-pie";
import { BarChartCase } from "./chart-case-bar";

export class GreeterD3 {
  constructor(public greeting: string) {
  }

  private barChart: BarChart;
  private axisChart: AxisChart;
  private scatterChart: ScatterChart;
  private areaChart: AreaChart;
  private arcChart: ArcChart;
  private chartBarCase: BarChartCase;
  private dataset: any;
  private index: number = 0.0;
  public drawBarChart(dataset: any, contain: any, isFont: boolean) {
    this.index++;
    this.dataset = dataset;
    let rectStep: number = 8;
    let rectWidth: number = 30;
    let fontSize: any = 14;
    let padding: any = { top: 0, right: 0, bottom: 0, left: 50 };
    this.barChart = new BarChart(this.dataset, contain, padding);
    this.barChart.BarChart(rectStep, rectWidth, COMMA.Constant.COLOR.steelblue);
    if (isFont) {
      this.barChart.appendText(COMMA.Constant.TEXT_ANCHOR.middle, COMMA.Constant.COLOR.white, fontSize);
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
    this.scatterChart.ScatterChart(dataset, COMMA.Constant.COLOR.black, radius, xScale, yScale);
  }

  public drawAreaChart(dataset: any, contain: any) {
    let strokeWidth: number;
    this.index++;
    let padding: any = { top: 0, right: 0, bottom: contain.attr("height") / this.index, left: 50 };
    this.areaChart = new AreaChart(contain, padding);
    this.areaChart.AreaChart(dataset, COMMA.Constant.COLOR.yellow, COMMA.Constant.COLOR.black, strokeWidth, COMMA.Constant.ORINET.bottom, COMMA.Constant.INTERPOLATER.basis);
  }

  public drawArcChart(dataset: any, contain: any, innerRadius: number, outerRadius: number) {
    this.index++;
    let padding: any = { top: 0, right: 50, bottom: contain.attr("height") / this.index + 100, left: 0 };
    let strokeWidth: number;
    let fontSize: number = 14;
    let fill = D3.scale.category10();
    this.arcChart = new ArcChart(contain, padding);
    this.arcChart.ArcChart(dataset, innerRadius, outerRadius,
      COMMA.Constant.COLOR.black, strokeWidth, fill
      , COMMA.Constant.TEXT_ANCHOR.middle, fontSize, COMMA.Constant.COLOR.black);
  }

  public drawLineChart(dataset: any, contain: any, interprolate: string) {
    let colors = [D3.rgb(0, 0, 255), D3.rgb(0, 255, 0)];
    let fun = (d, i) => (colors[i]);
    this.index++;
    let padding: any = { top: 0, right: 0, bottom: 50, left: 50 };
    let lineChartCase: LineChartCase = new LineChartCase(padding, contain);
    let strokeWidth = 1;
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
    lineChartCase.LineChartCase(dataset, [xMin, xMax], [yMin, yMax], strokeWidth, fun, interprolate);
  }
  public drawScatterCaseChart(dataset: any, contain: any, duration: any, fillColor: any) {
    let colors = [D3.rgb(0, 0, 255), D3.rgb(0, 255, 0)];
    let fun = (d, i) => (colors[i]);
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
    scatterChartCase.ScatterChartCase(dataset, [0, 1], [0, 1], duration, fillColor);
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
    pieChartCase.appendDirectText(COMMA.Constant.COLOR.black, COMMA.Constant.TEXT_ANCHOR.middle, 20, direct);
  }

  public drawBarChartCase(contain: any, range: any, bins: any, dataset: any) {
    let padding: any = { top: 30, right: 30, bottom: 30, left: 30 };
    this.chartBarCase = new BarChartCase(contain, padding);
    this.chartBarCase.BarCaseChart(dataset, range, bins,COMMA.Constant.COLOR.steelblue);
  }
  public showhideBar() {
    this.chartBarCase.showRect();
  }
  public showhideLine() {
    this.chartBarCase.showLine();
  }
};
