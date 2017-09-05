import * as D3 from "d3";
import { COMMA } from "./comma";
import { AxisChart } from "./axis-scale";

export class BarChartCase {
    private chart: any;
    private gBar: any;
    private gLine: any;
    constructor(contain: any, private padding: any) {
        this.chart = contain.append("g")
            .attr("width", contain.attr("width"))
            .attr("height", contain.attr("height"));
    }
    public BarCaseChart(dataset: any, range: any, bins: number) {
        let histogram = D3.layout.histogram()
            .range(range)	//数据分布的范围
            .bins(bins)	//bins的数量
            .frequency(true);	//按照数量统计的方式
        let hisData = histogram(dataset);
        // console.log(hisData);
        // 构建坐标轴
        let width = this.chart.attr("width");
        let height = this.chart.attr("height");
        let xAxisWidth = 450;// = width - this.padding.left - this.padding.right;
        //let yAxisWidth = height - this.padding.bottom - this.padding.top;
        let axis: AxisChart = new AxisChart();
        let xTicks = hisData.map((d) => (d.x));
        let xScale = axis.Scale(xTicks, [0, xAxisWidth], COMMA.ScaleType.Ordinal, 0.1);
        // let extent = D3.extent(hisData, (d) => (d.y));
        // let yScale = axis.Scale(extent, [5, yAxisWidth], COMMA.ScaleType.Linear, null);
        let xAxis = axis.AxisChart(this.chart, null, ".0f", null, null, xScale, COMMA.Constant.ORINET.bottom, this.padding.left, height - this.padding.bottom);
        /*         this.gBar = this.chart.append("g")
                    .attr("transform", "translate(" + this.padding.left + "," + (-this.padding.bottom) + ")")
                    .style("opacity", 1.0); */
        // this.gBar.selectAll("rect")
        //     .data(hisData)
        //     .enter()
        //     .append("rect")
        //     .attr("x", (d, i) => (xScale(d.x)))
        //     .attr("y", (d, i) => (height - yScale(d.y)))
        //     .attr("width", (d, i) => xScale.rangeBand())
        //     .attr("height", (d) => yScale(d.y));
        // let line = D3.svg.line()
        //     .x((d) => (xScale(d.x)))
        //     .y((d) => (height - yScale(d.y)))
        //     .interpolate("basis");
        // this.gLine = this.chart.append("g")
        //     .attr("transform", "translate(" + this.padding.left + "," + (-this.padding.bottom) + ")")
        //     .style("opacity", 0.0);
        // this.gLine.append("path")
        //     .attr("class", "linePath")
        //     .attr("d", line(hisData));
    }
    public showRect() {
        this.gBar.style("opacity", !this.gBar.style("opacity"));
    }
    public showLine() {
        this.gLine.style("opacity", !this.gLine.style("opacity"));
    }
}