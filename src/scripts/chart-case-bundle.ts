import * as D3 from "d3";
import { BaseCase } from "./chart-case";
/**
 * 捆图，用于表示物种之间的关系图
 */
export class BundleChartCase extends BaseCase {
    constructor(contain: any, padding: any) {
        super(contain, padding);
        this.chart.attr("transform", "translate(" + (this.width * 0.5) + "," + (this.height * 0.5) + ")");
    }
    public BundleChartCase(domain: any, range: any, color: any, radius: number) {
        let radiusRange = Math.min(this.width, this.height) * 0.5 - radius * 2;
        let cluster = D3.layout.cluster()
            .size([360, radiusRange])
            .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);
        let bundle = D3.layout.bundle();
        let nodes = cluster.nodes(domain);
        let oLinks = this.map(nodes, range);
        let links = bundle(oLinks);
        // 3. 绘图
        let line = D3.svg.line.radial()
            .interpolate("bundle")
            .tension(.85)
            .radius((d) => d.y)
            .angle((d) => d.x / 180 * Math.PI);

        let link = this.chart.selectAll(".bundleLink")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "bundleLink")
            .attr("d", line);	// 使用线段生成器

        let node = this.chart.selectAll(".bundleNode")
            .data(nodes.filter((d) => !d.children))
            .enter()
            .append("g")
            .attr("class", "bundleNode")
            .attr("transform", (d) => "rotate(" + (d.x - 90) + ")translate(" + d.y + ")" + "rotate(" + (90 - d.x) + ")");

        node.append("circle")
            .attr("class", "bundleCircle")
            .attr("r", radius)
            .style("fill", (d, i) => color(i));

        node.append("text")
            .attr("class", "bundleText")
            .attr("dy", ".2em")            
            .text((d) => d.name);
    }
    // 将links中的source和target由名称替换成节点
    private map(nodes, links) {
        let hash = [];
        for (let i = 0; i < nodes.length; i++) {
            hash[nodes[i].name] = nodes[i];
        }
        let resultLinks = [];
        for (let i = 0; i < links.length; i++) {
            resultLinks.push({
                source: hash[links[i].source],
                target: hash[links[i].target]
            });
        }
        return resultLinks;
    }
}
