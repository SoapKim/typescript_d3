import * as D3 from "d3";
import { BaseCase } from "./chart-case";
/**
 * 散点图，目前不支持半径的动态变化
 * 用于描述具有集散特性事物
 * 例如：访问节点的频数
 * 动物栖息地活动频繁度，热图
 */
export class ScatterChart extends BaseCase {
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }

    public ScatterChart(dataset: any, r: number, xScale: any, yScale: any) {
        let scatterUpdate = this.chart.selectAll("cirlce").data(dataset);
        let scatterEnter = scatterUpdate.enter();
        let scatterExit = scatterUpdate.exit();
        this.setScatter(scatterUpdate, this.padding, xScale, yScale, this.height, r);
        this.setScatter(scatterEnter.append("circle"), this.padding, xScale, yScale, this.height, r);
        scatterExit.remove();
        return this.chart;
    }
    private setScatter(chart: any, padding: any, xScale: any, yScale: any,
        height: number, r: number) {
        chart.attr("class", "scatterCircle")
            .attr("cx", ((d) => (padding.left + xScale(d[0]))))
            .attr("cy", ((d) => (height - padding.bottom - yScale(d[1]))))
            .attr("r", r);
        return chart;
    }
}
