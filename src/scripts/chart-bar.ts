// 引入three.js
import * as D3 from "d3";

export class BarChart {
  // 柱形图容器
  private chart: any;
  // 是否绘制
  private isFont: boolean;
  private fontAnchor: string;
  private fontColor: any;
  private fontSize: any;
  /* 创建柱状图
   * dataset 数据集
   * contain 绘制的父容器
   * width 宽度
   * heigth 高度
   * padding {top:,right:,bottom:,left:} 距离四周的距离
   * rectStep 柱形图之间的间距
   * rectWidth 柱形图的宽度
   * fillColor 柱形图填充色
   */
  constructor(public dataset: any, contain: any, private width: number, private height: number,
    private padding: any, private rectStep: number, private rectWidth: number, private fillColor: any) {
    this.BarChart(contain);
  }

  /* 追加文字
   * fontAnchor 字体锚点
   * fontColor 字体颜色
   * fontSize 字体大小
   */
  public appendText(fontAnchor: string, fontColor: any, fontSize: any) {
    this.isFont = true;
    this.fontAnchor = fontAnchor;
    this.fontColor = fontColor;
    this.fontSize = fontSize;
    return this.updateText();
  }

  /* 创建柱状图
   * contain 绘制的父容器
   * fillColor 柱形图填充色
   */
  private BarChart(contain: any) {
    this.chart = contain.append("svg")
      .style({
        "width": this.width,
        "height": this.height,
      });
    this.updateRect();
    return this.chart;
  }
public update(){
  this.updateRect();
  if(this.isFont){
    this.updateText();
  }
}
  private updateText() {
    let textUpdate = this.chart.selectAll("text")
      .data(this.dataset);
    let textEnter = textUpdate.enter();
    let textExit = textUpdate.exit();

    this.setText(textUpdate, this.padding, this.rectStep, this.rectWidth, this.height,
      this.fontAnchor, this.fontColor, this.fontSize);
    this.setText(textEnter.append("text"), this.padding, this.rectStep, this.rectWidth, this.height,
      this.fontAnchor, this.fontColor, this.fontSize);
    textExit.remove();
    return textUpdate;
  }

  private updateRect() {
    let rectUpdate = this.chart.selectAll("rect")
      .data(this.dataset);
    //  更新数据
    let rectEnter = rectUpdate.enter();
    let rectExit = rectUpdate.exit();

    this.setRect(rectUpdate, this.padding, this.height, this.rectWidth, this.rectStep, this.fillColor);
    this.setRect(rectEnter.append("rect"), this.padding, this.height, this.rectWidth, this.rectStep, this.fillColor);
    rectExit.remove();
  }

  private setText(update: any, padding: any,
    rectStep: number, rectWidth: number, height: number,
    fontAnchor: string, fontColor: any, fontSize: any) {
    update.attr("x", (d, i) => (padding.left + i * (rectStep + rectWidth)))
      .attr("y", (d) => (height - padding.bottom - d))
      .attr("dx", (rectWidth * 0.5))
      .attr("dy", "1em")
      .style({
        "fill": fontColor,
        "font-size": fontSize,
        "text-anchor": fontAnchor,
      })
      .text((d) => (d));
  }
  private setRect(update: any, padding: any, height: number, rectWidth: number, rectStep: number, fillColor: any) {
    update.attr("x", (d, i) => (padding.left + i * (rectStep + rectWidth)))
      .attr("y", (d) => (height - padding.bottom - d))
      .style({
        "fill": fillColor,
        "width": rectWidth,
        "height": (d) => (d),
      });
  }
};
