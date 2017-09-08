import * as D3 from "d3";
import { BaseCase } from "./chart-case";
import { COMMA } from "./comma";
/**
 * 饼图布局
 */

export class PieChartCase extends BaseCase {
    private dataset: any;
    private arcRadius: any;
    private arcSvg: any;
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }
    /**
     * 
     * @param dataset   支持的数据格式为[0,1]
     * @param innerRadius 
     * @param outerRadius 
     * @param color 必须为函数
     * @param x 
     * @param y 
     */
    public PieChart(dataset: any, arcAngle: any, innerRadius: number, outerRadius: number, color: any, x: number, y: number) {
        let pie = D3.layout.pie();
        if (arcAngle) {
            pie.startAngle(arcAngle[0])
                .endAngle(arcAngle[1]);
        }
        pie.value((d) => (d[1]));
        // 执行数据绑定，不需要自行计算百分比
        this.dataset = dataset;
        let piedata = pie(dataset);
        this.arcRadius = D3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        this.arcSvg = this.chart.selectAll("g")
            .data(piedata)
            .enter()
            .append("g")
            .attr("transform", "translate(" + x + "," + y + ")");
        let arc = this.arcRadius;
        this.arcSvg.append("path")
            .attr("class", "pieInnerPath")
            .attr("fill", (d, i) => (color(i)))
            .attr("d", (d, i) => (arc(d)));
    }
    public appendText(anchor: string, text: any, fontSize: number) {
        let arc = this.arcRadius;
        this.arcSvg.append("text")
            .attr("class", "pieInnerText")
            .attr("transform", (d) => "translate(" + arc.centroid(d)[0] * 1.4 + "," + arc.centroid(d)[1] * 1.4 + ")")
            .text(text);
    }
    public appendDirectText(text: any) {
        let arc = this.arcRadius;
        this.arcSvg.append("line")
            .attr("class", "pieOuterLine")
            .attr("x1", (d) => arc.centroid(d)[0] * 2)
            .attr("y1", (d) => arc.centroid(d)[1] * 2)
            .attr("x2", (d) => arc.centroid(d)[0] * 2.2)
            .attr("y2", (d) => arc.centroid(d)[1] * 2.2);
        this.arcSvg.append("text")
            .attr("class", "pieOuterText")
            .attr("transform", (d) => "translate(" + arc.centroid(d)[0] * 2.5 + "," + arc.centroid(d)[1] * 2.5 + ")")
            .text(text);
    }
}
