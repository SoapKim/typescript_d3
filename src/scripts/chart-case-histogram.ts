import * as D3 from "d3";
import { AxisChart } from "./axis-scale";
import { BaseCase } from "./chart-case";
import { COMMA } from "./comma";
/**
 * 直方图
 */
export class HistogramChartCase extends BaseCase {
    private gBar: any;
    private gLine: any;
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }

    public HistogramCaseChart(dataset: any, range: any, bins: any) {
        let histogram = D3.layout.histogram()
            .range(range)	// 数据分布的范围
            .bins(bins)	// bins的数量
            .frequency(true);	// 按照数量统计的方式
        let hisData = histogram(dataset);
        // 构建坐标轴

        let xAxisWidth = this.width - this.padding.left - this.padding.right;
        let xTicks = hisData.map((d) => (d.x));
        let axis: AxisChart = new AxisChart();
        let xScale = axis.Scale(xTicks, [0, xAxisWidth], COMMA.ScaleType.Ordinal, [0.1]);
        let yAxisWidth = this.height - this.padding.bottom - this.padding.top;
        let extent = D3.extent(hisData, (d) => (d.y));
        let yScale = axis.Scale(extent, [5, yAxisWidth], COMMA.ScaleType.Linear, null);
        let xAxis = axis.AxisChart(this.chart, null, ".0f", null, null, xScale, COMMA.Constant.ORINET.bottom, this.padding.left, this.height - this.padding.bottom);
        this.gBar = this.chart.append("g")
            .attr("transform", "translate(" + this.padding.left + "," + (-this.padding.bottom) + ")")
            .style("opacity", 1.0);
        let height = this.height;
        this.gBar.selectAll("rect")
            .data(hisData)
            .enter()
            .append("rect")
            .attr("class", "histogramRect")
            .attr("x", (d, i) => (xScale(d.x)))
            .attr("y", (d, i) => (height - yScale(d.y)))
            .attr("width", (d, i) => xScale.rangeBand())
            .attr("height", (d) => yScale(d.y));
        let line = D3.svg.line()
            .x((d) => (xScale(d.x)))
            .y((d) => (height - yScale(d.y)))
            .interpolate("basis");
        this.gLine = this.chart.append("g")
            .attr("transform", "translate(" + this.padding.left + "," + (-this.padding.bottom) + ")")
            .style("opacity", 0.0);
        this.gLine.append("path")
            .attr("class", "histogramPath")
            .attr("d", line(hisData));
    }
    public showRect() {
        this.gBar.style("opacity", this.gBar.style("opacity") == 1.0 ? 0.0 : 1.0);
    }
    public showLine() {
        this.gLine.style("opacity", this.gLine.style("opacity") == 1.0 ? 0.0 : 1.0);
    }
}
