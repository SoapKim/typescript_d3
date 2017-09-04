import * as D3 from "d3";
import { COMMA } from "./comma";
import { AxisChart } from "./axis-scale";
/**
 * 折线图
 */
export class LineChartCase {
    private chart: any;
    constructor(private padding: any, contain: any) {
        this.chart = contain.append("g")
            .attr("width", contain.attr("width"))
            .attr("height", contain.attr("height"));
    }
    public LineChartCase(dataset: any, xDomain: any, yDomain: any,
         strokeWidth: number, strokeColor: any,interprolate:string) {
        let axis = new AxisChart();
        let width = this.chart.attr("width");
        let height = this.chart.attr("height");
        let xScale = axis.Scale(xDomain, [0, width - this.padding.left - this.padding.right],
            COMMA.ScaleType.Linear, null);
        let yScale = axis.Scale(yDomain, [height - this.padding.top - this.padding.bottom, 0],
            COMMA.ScaleType.Linear, null);
        let linePath = D3.svg.line()
            .x((d) => (xScale(d[0])))
            .y((d) => (yScale(d[1])));
        if(interprolate){
            linePath.interprolate(interprolate);
        }

        this.chart.selectAll("path")
            .data(dataset)
            .enter()
            .append("path")
            .attr("transform", "translate(" + this.padding.left + "," + this.padding.top + ")")
            .attr("d", (d) => linePath(d.value))
            .style({
                "fill": "none",
                "stroke-width": strokeWidth,
                "stroke": strokeColor,
            });
        // 需要注意chart 与axis的先后顺序，因为闭包问题容易导致异常
        axis.AxisChart(this.chart, 5, "d", null, null, xScale,
            COMMA.Constant.ORINET.bottom, this.padding.left, height - this.padding.bottom);
        axis.AxisChart(this.chart, null, null, null, null, yScale,
            COMMA.Constant.ORINET.left, this.padding.left, this.padding.top);
    }
}