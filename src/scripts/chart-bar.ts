import * as D3 from "d3";
import { BaseCase } from "./chart-case";
/**
 * 条形图，目前不支持叠加折线图
 */
export class BarChart extends BaseCase {
  // 是否绘制
  private isFont: boolean;
  private rectStep: number;
  private rectWidth: number;
  /* 创建柱状图
   * dataset 数据集
   * contain 绘制的父容器
   * padding {top:,right:,bottom:,left:} 距离四周的距离
   * rectStep 柱形图之间的间距
   * rectWidth 柱形图的宽度
   * fillColor 柱形图填充色
   */
  constructor(private dataset: any, contain: any, padding: any) {
    super(contain, padding);
  }

  /* 追加文字
   * fontAnchor 字体锚点
   * fontColor 字体颜色
   * fontSize 字体大小
   */
  public appendText() {
    this.isFont = true;
    return this.updateText();
  }

  public BarChart(rectStep: number, rectWidth: number, ) {
    this.rectStep = rectStep;
    this.rectWidth = rectWidth;
    this.update();
  }
  public update() {
    this.updateRect();
    if (this.isFont) {
      this.updateText();
    }
  }
  private updateText() {
    let textUpdate = this.chart.selectAll("text")
      .data(this.dataset);
    let textEnter = textUpdate.enter();
    let textExit = textUpdate.exit();
    let height = this.chart.attr("height");
    this.setText(textUpdate, this.padding, this.rectStep, this.rectWidth, height);
    this.setText(textEnter.append("text"), this.padding, this.rectStep, this.rectWidth, height);
    textExit.remove();
    return textUpdate;
  }

  private updateRect() {
    let rectUpdate = this.chart.selectAll("rect").data(this.dataset);
    //  更新数据
    let rectEnter = rectUpdate.enter();
    let rectExit = rectUpdate.exit();

    this.setRect(rectUpdate, this.padding, this.chart.attr("height"), this.rectWidth, this.rectStep);
    this.setRect(rectEnter.append("rect"), this.padding, this.chart.attr("height"), this.rectWidth, this.rectStep);
    rectExit.remove();
  }

  private setText(update: any, padding: any,
    rectStep: number, rectWidth: number, height: number) {
    update.attr("x", (d, i) => (padding.left + i * (rectStep + rectWidth)))
      .attr("class", "barText")
      .attr("y", (d) => (height - padding.bottom - d))
      .attr("dx", (rectWidth * 0.5))
      .attr("dy", "1em")
      .text((d) => (d));
  }
  private setRect(update: any, padding: any, height: number, rectWidth: number, rectStep: number) {
    update.attr("x", (d, i) => (padding.left + i * (rectStep + rectWidth)))
      .attr("y", (d) => (height - padding.bottom - d))
      .attr("class", "barRect")
      .attr("height", (d) => (d))
      .attr("width", rectWidth);
  }
}
