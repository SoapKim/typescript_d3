// 引入three.js
import * as D3 from "d3";
import { BarChart } from "./chart-bar";
export class GreeterD3 {
  constructor(public greeting: string) {
  }
  private barChart:BarChart;
  private dataset:any;
  public init(dataset: any, contain: any, isFont: boolean) {
    this.dataset = dataset;
    let padding = { top: 0, right: 0, bottom: 0, left: 0 };
    let width: number = 600;
    let heigth: number = 400;
    let rectStep: number = 8;
    let rectWidth: number = 30;
    let fillColor: any = "steelblue";
    let fontSize: any = 14;
    let fontColor: any = "white";
    let fontAnchor: string = "middle";
    this.barChart = new BarChart(this.dataset, contain, width, heigth, padding, rectStep, rectWidth, fillColor);
    if (isFont) {
      this.barChart.appendText(fontAnchor, fontColor, fontSize);
    }
  }
  public sortBar(){
    this.dataset.sort(D3.ascending);
    this.barChart.update();
  }

  public addData(){
    this.dataset.push(Math.floor(Math.random()*200));
    this.barChart.update();
  }
};
