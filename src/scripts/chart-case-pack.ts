import * as D3 from "d3";
import { BaseCase } from "./chart-case";
/**
 * 捆图，用于表示物种之间的关系图
 */
export class PackChartCase extends BaseCase {
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }
    public PackChartCase(data: string, color: any, radius: number, padd: number) {
        let pack = D3.layout.pack()
            .size([this.width - this.padding.left - this.padding.right,
            this.height - this.padding.top - this.padding.bottom])
            .radius(radius)
            .padding(padd);
        let main = this;
        D3.json(data, (error, root) => {
            if (error) {
                console.log(error);
                return;
            }
            main.analysisNode(main.chart, root, pack, color);
        });
    }
    private analysisNode(chart: any, root: any, pack: any, color: any) {
        let nodes = pack.nodes(root);
        let links = pack.links(nodes);

        chart.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", (d) => d.children ? "packNode" : "packLeafnode")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", (d) => d.r);

        this.chart.selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("class", "packNodeText")
            .style("fill-opacity", (d) => d.children ? 0 : 1)
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("dy", ".3em")
            .text((d) => d.name);
    }
}
