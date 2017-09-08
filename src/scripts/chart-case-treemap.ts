import * as D3 from "d3";
import { BaseCase } from "./chart-case";
import { COMMA } from "./comma";
/**
 * 树形矩阵图
 */
export class TreeMapChartCase extends BaseCase {
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }
    public TreeMapChartCase(data: string, color: any) {
        let treemap = D3.layout.treemap()
            .size([this.width - this.padding.left - this.padding.right,
            this.height - this.padding.top - this.padding.bottom])
            .value((d) => d.value);
        let main = this;
        D3.json(data, (error, root) => {
            if (error) {
                console.log(error);
                return;
            }
            main.analysis(root, main, treemap, color);
        });
    }
    private analysis(root: any, main: any, treemap: any, color: any) {
        let nodes = treemap.nodes(root);
        let links = treemap.links(nodes);

        let groups = main.chart.selectAll("g")
            .data(nodes.filter((d) => !d.children))
            .enter()
            .append("g");

        let rects = groups.append("rect")
            .attr("class", "treemapNodeRect")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("width", (d) => d.dx)
            .attr("height", (d) => d.dy)
            .style("fill", (d, i) => color(d.parent.name));

        let texts = groups.append("text")
            .attr("class", "treemapNodeName")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("dx", "0.5em")
            .attr("dy", "1.5em")
            .text((d) => d.name + " " + d.value);
    }
}
