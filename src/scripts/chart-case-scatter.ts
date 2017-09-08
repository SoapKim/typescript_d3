import * as D3 from "d3";
import { AxisChart } from "./axis-scale";
import { BaseCase } from "./chart-case";
import { COMMA } from "./comma";
import { ScatterChart } from "./chart-scatter";
/**
 * 散点图，二次封装，增加动画效果
 */
export class ScatterChartCase extends BaseCase {
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }
    /**
     * 散点图
     * @param dataset 支持的数据格式如下
     *  [[0.5, 0.5], [0.7, 0.8], [0.4, 0.9], [0.11, 0.32], [0.88, 0.25], [0.75, 0.12], [0.5, 0.1], [0.2, 0.3], [0.4, 0.1], [0.6, 0.7]];
     * @param xDomain 
     * @param yDomain 
     * @param duration 
     * @param fillColor 
     */
    public ScatterChartCase(dataset: any, xDomain: any, yDomain: any, duration: number, radius: number) {
        let padding = this.padding;
        let axis = new AxisChart();
        let xAxisWidth = this.width - this.padding.left - this.padding.right;
        let xScale = axis.Scale(xDomain, [0, xAxisWidth],
            COMMA.ScaleType.Linear, null);
        let yAxisHeight = this.height - this.padding.top - this.padding.bottom;
        let yScale = axis.Scale(yDomain, [0, yAxisHeight],
            COMMA.ScaleType.Linear, null);
        let scatterUpdate = this.chart.selectAll("cirlce").data(dataset);
        let scatterEnter = scatterUpdate.enter();
        let scatterExit = scatterUpdate.exit();
        let height = this.height;
        scatterUpdate.transition()
            .duration(duration)
            .attr("cx", (d) => (padding.left + xScale(d[0])))
            .attr("cy", (d) => (height - padding.bottom - yScale(d[1])));
        scatterEnter.append("circle")
            .attr("class", "scatterCaseCirle")
            .attr("cx", padding.left)
            .attr("cy", height - padding.bottom)
            .attr("r", 0)
            .transition()
            .duration(duration)
            .attr("cx", (d) => (padding.left + xScale(d[0])))
            .attr("cy", (d) => (height - padding.bottom - yScale(d[1])))
            .attr("r", radius);
        scatterExit.transition()
            .duration(duration)
            .attr("fill", "none")
            .remove();
        // 需要注意chart 与axis的先后顺序，因为闭包问题容易导致异常
        axis.AxisChart(this.chart, null, null, null, null, xScale,
            COMMA.Constant.ORINET.bottom, this.padding.left, this.height - this.padding.bottom);
        yScale.range([yAxisHeight, 0]);
        axis.AxisChart(this.chart, null, null, null, null, yScale,
            COMMA.Constant.ORINET.left, this.padding.left, this.padding.top);
        yScale.range([0, yAxisHeight]);
    }
}
