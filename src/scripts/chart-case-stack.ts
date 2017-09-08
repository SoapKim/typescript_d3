import * as D3 from "d3";
import { AxisChart } from "./axis-scale";
import { BaseCase } from "./chart-case";
import { COMMA } from "./comma";
/**
 * 堆栈图，描述拥有层次关系的事物信息
 * 例如，描述生物多样性
 * 地区检测信息的累积情况
 * 历年降水量的按月累积情况
 */
export class StackChartCase extends BaseCase {
    private group: any;
    private stackType: COMMA.StackType;
    private xScale: any;
    private yScale: any;
    private yRangeWidth: number;
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }

    public StackChart(dataset: any, stackType: COMMA.StackType, color: any) {
        let stack = D3.layout.stack()
            .values((d) => (d.value))
            .x((d) => (d[0]))
            .y((d) => (d[1]));
        let stackData = stack(dataset);
        let xRangeWidth = this.width - this.padding.left - this.padding.right;
        let axis: AxisChart = new AxisChart();

        this.xScale = axis.Scale(stackData[0].value.map((d) => (d[0])), [0, xRangeWidth],
            COMMA.ScaleType.Ordinal, [0.3]);
        let max = D3.max(stackData[stackData.length - 1].value, (d) => (d.y0 + d.y));
        this.yRangeWidth = this.height - this.padding.top - this.padding.bottom;
        this.yScale = axis.Scale([0, max], [0, this.yRangeWidth], COMMA.ScaleType.Linear, null);
        this.group = this.chart.selectAll("g")
            .data(stackData)
            .enter()
            .append("g")
            .style("fill", (d, i) => (color(i)));

        this.updateStackType(stackType);
        let xAxis = axis.AxisChart(this.chart, null, null, null, null, this.xScale,
            COMMA.Constant.ORINET.bottom, this.padding.left, this.height - this.padding.bottom);
        this.yScale.range([this.yRangeWidth, 0]);
        let yAxis = axis.AxisChart(this.chart, null, null, null, null, this.yScale,
            COMMA.Constant.ORINET.left, this.padding.left, this.height - this.padding.bottom - this.yRangeWidth);
        this.yScale.range([0, this.yRangeWidth]);
    }
    public appendLabel(labelHeight: any, radius: any) {
        let padding = this.padding;
        let width = this.width;
        let circle = this.group.append("circle")
            .attr("cx", (d) => (width - padding.right + radius * 0.5))
            .attr("cy", (d, i) => (padding.top * 2 + labelHeight * i))
            .attr("r", radius);
        let text = this.group.append("text")
            .attr("x", (d) => (width - padding.right + radius * 2))
            .attr("y", (d, i) => (padding.top * 2 + labelHeight * i))
            .attr("dy", radius * 0.5)
            .text((d) => (d.region));
    }
    public updateStackType(type: COMMA.StackType) {
        if (this.stackType == type) {
            return;
        }
        this.stackType = type;
        switch (this.stackType) {
            case COMMA.StackType.Stack: {
                this.group.selectAll("path").remove();
                this.stack(this.xScale, this.yScale, this.yRangeWidth);
                break;
            }
            case COMMA.StackType.AreaStack: {
                this.group.selectAll("rect").remove();
                this.stackArea(this.xScale, this.yScale, this.yRangeWidth, COMMA.Constant.INTERPOLATER.basis);
                break;
            }
            default:
                break;
        }

    }
    private stack(xScale: any, yScale: any, yRangeWidth: any) {
        return this.group.selectAll("rect")
            .data((d) => (d.value))
            .enter()
            .append("rect")
            .attr("x", (d) => (xScale(d[0])))
            .attr("y", (d) => (yRangeWidth - yScale(d.y0 + d.y)))
            .attr("width", (d) => (xScale.rangeBand()))
            .attr("height", (d) => (yScale(d.y)))
            .attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")");
    }

    private stackArea(xScale: any, yScale: any, yRangeWidth: number, interpolate: string) {
        let area = D3.svg.area()
            .x((d) => (xScale(d[0]) + xScale.rangeBand() * 0.5))
            .y0((d) => (yRangeWidth - yScale(d.y0)))
            .y1((d) => (yRangeWidth - yScale(d.y0 + d.y)))
            .interpolate(interpolate);
        return this.group.append("path")
            .attr("d", (d) => area(d.value))
            .attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")");
    }
}
