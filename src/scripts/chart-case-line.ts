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
    /**
     * 
     * @param dataset 支持的数格式如下
     * let lineData = [{
     *     region: "china",
     *     value: [[2000, 11920], [2001, 13170], [2002, 14550], [2003, 16500], [2004, 19440], [2005, 22870],
     *     [2006, 27930], [2007, 35040], [2008, 45470], [2009, 51050], [2010, 59490]]
     * }, {
     *     region: "japan",
     *     value: [[2000, 41920], [2001, 43170], [2002, 34550], [2003, 46500], [2004, 49440], [2005, 42870],
     *     [2006, 47930], [2007, 45040], [2008, 45470], [2009, 41050], [2010, 54490]]
     * }];
     * @param xDomain 
     * @param yDomain 
     * @param strokeWidth 
     * @param strokeColor 
     * @param interpolate 
     */
    public LineChartCase(dataset: any, xDomain: any, yDomain: any,
         strokeWidth: number, strokeColor: any,interpolate:string) {
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
        if(interpolate){
            linePath.interpolate(interpolate);
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