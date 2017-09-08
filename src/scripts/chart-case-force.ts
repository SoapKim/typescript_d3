import * as D3 from "d3";
import { BaseCase } from "./chart-case";
/**
 * 力导向图，用于表示物种之间的关系图
 */
export class ForceChartCase extends BaseCase {
    private force: any;
    private nodes: any;
    private text: any;
    private edge: any;
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }
    public ForceChartCase(domain: any, range: any, linkDis: number, charge: number,
        color: any, radius: number) {
        this.force = D3.layout.force()
            .nodes(domain)
            .links(range)
            .size([this.width, this.height])
            .linkDistance(linkDis)
            .charge(charge);
        this.force.start();
        this.edge = this.chart.selectAll(".forceLine")
            .data(range)
            .enter()
            .append("line")
            .attr("class", "forceLine");
        this.nodes = this.chart.selectAll(".forceCircle")
            .data(domain)
            .enter()
            .append("circle")
            .attr("r", radius)
            .attr("class", "forceCircle")
            .style("fill", (d, i) => (color(i)))
            .call(this.force.drag);
        this.text = this.chart.selectAll("forceText")
            .data(domain)
            .enter()
            .append("text")
            .attr("class", "forceText")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .text((d, i) => (d[0]));
        this.appendTick();
    }
    private appendTick() {
        this.force.on("tick", () => {
            // 对于每一个时间间隔更新连线坐标
            this.edge.attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            // 更新节点坐标
            this.nodes.attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y);

            // 更新文字坐标
            this.text.attr("x", (d) => d.x)
                .attr("y", (d) => d.y);
        });
    }
}
