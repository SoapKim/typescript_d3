// 引入three.js
import * as D3 from "d3";
import { BarChart } from "./chart-bar";
import { COMMA } from "./comma";
import { AxisChart } from "./axis-scale";
import { ScatterChart } from "./chart-scatter";

export class GreeterD3 {
  constructor(public greeting: string) {
  }

  private barChart: BarChart;
  private axisChart: AxisChart;
  private scatterChart: ScatterChart;
  private dataset: any;
  private index:number = 0.0;
  public drawBarChart(dataset: any, contain: any, isFont: boolean) {
    this.index++;
    this.dataset = dataset;
    let rectStep: number = 8;
    let rectWidth: number = 30;
    let fontSize: any = 14;
    let padding: any = { top: 0, right: 0, bottom: 0, left: 0 };
    this.barChart = new BarChart(this.dataset, contain, padding, rectStep, rectWidth, COMMA.Constant.COLOR.steelblue);
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
    type: COMMA.ScaleType, value: any,
    orient: string, x: number, y: number) {
    if (!this.axisChart) {
      this.axisChart = new AxisChart("just test");
    }
    this.axisChart.AxisChart(contain, domain, range,
      ticks, tickFormat, innerTick, outerTick, type, value,
      orient, x, y);
  }
  public drawAxisTickValues(contain: any, domain: any, range: any,
    tickValues: any, tickFormat: string, innerTick: number, outerTick: number,
    type: COMMA.ScaleType, value: any,
    orient: string, x: number, y: number) {
    if (!this.axisChart) {
      this.axisChart = new AxisChart("just test");
    }
    this.axisChart.AxisChartTickValues(contain, domain, range,
      tickValues, tickFormat, innerTick, outerTick, type, value,
      orient, x, y);
  }
  public drawScatterChart(contain: any, xAxisWidth: number, yAxisHeight: number, dataset: any, radius: number) {
      let xScale = D3.scale.linear()
        .domain([0, (1.2 * D3.max(dataset, (d) => (d[0])))])
        .range([0, xAxisWidth]);
      let yScale = D3.scale.linear()
        .domain([0, 1.2 * D3.max(dataset, (d) => (d[1]))])
        .range([0, yAxisHeight]);
      this.index++;
      let padding: any = { top: 0, right: 0, bottom: contain.attr("height")/this.index, left: 0 };
      this.scatterChart = new ScatterChart(contain, padding, dataset, COMMA.Constant.COLOR.black, xScale, yScale, radius);
  }
};
