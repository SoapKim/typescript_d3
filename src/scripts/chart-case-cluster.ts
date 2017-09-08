import * as D3 from "d3";
import { BaseCase } from "./chart-case";
import { COMMA } from "./comma";
/**
 * 树图，簇图
 * 用于描述具有层次关系，用于定义物种的多样性
 */
export class ClusterTreeChartCase extends BaseCase {
    public dataset: any;
    private layout: any;
    private diagonal: any;
    private radius: number;
    private type: COMMA.ClusterType;
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }
    public ClusterTree(dataPath: string, clusterType: COMMA.ClusterType, radius: number) {
        this.clusterTransform(this, clusterType);
        let main = this;
        D3.json(dataPath, (error, root) => {
            if (error) {
                console.log(error);
                return;
            }
            main.dataset = root;
            main.radius = radius;
            // 执行成功后赋值
            main.type = clusterType;
            main.analysisNodes(main);
        });
    }
    public updateClusterType(type: COMMA.ClusterType) {
        if (this.type == type) {
            return;
        }
        if (!this.dataset) {
            console.log("数据加载失败，请重新加载数据！");
            return;
        }
        this.type = type;
        this.clusterTransform(this, type);
        this.chart.selectAll(".clusterLink").remove();
        this.chart.selectAll(".clusterNode").remove();
        this.analysisNodes(this);
    }
    private analysisNodes(main: any) {
        let nodes = main.layout.nodes(main.dataset);
        let links = main.layout.links(nodes);

        let link = main.chart.selectAll(".clusterLink")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "clusterLink")
            .attr("d", main.diagonal);	// 使用对角线生成器

        let node = main.chart.selectAll(".clusterNode")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "clusterNode");

        switch (main.type) {
            case COMMA.ClusterType.Tree:
            case COMMA.ClusterType.Cluster: {
                node.attr("transform", (d) => ("translate(" + d.y + "," + d.x + ")"));
                break;
            }
            case COMMA.ClusterType.Circle: {
                node.attr("transform", (d) => ("rotate(" + (d.x - 90) + ")translate(" + d.y + ")"));
                break;
            }
            default:
                console.log("unknown cluster type");
                break;
        }

        node.append("circle")
            .attr("r", main.radius)
            .attr("class", "clusterCircle");
        this.nodeText(node, main.type);
    }
    private clusterTransform(main: any, type: COMMA.ClusterType) {
        let offset: any = [main.padding.left, 0];
        switch (type) {
            case COMMA.ClusterType.Tree: {
                main.layout = D3.layout.tree()
                    .size([main.height - main.padding.top - main.padding.bottom,
                    main.width - main.padding.left - main.padding.right])
                    .separation((a, b) => (a.parent == b.parent ? 1 : 2));
                main.diagonal = D3.svg.diagonal()
                    .projection((d) => ([d.y, d.x]));
                break;
            }
            case COMMA.ClusterType.Cluster: {
                main.layout = D3.layout.cluster()
                    .size([main.height - main.padding.top - main.padding.bottom,
                    main.width - main.padding.left - main.padding.right])
                    .separation((a, b) => (a.parent == b.parent ? 1 : 2));
                main.diagonal = D3.svg.diagonal()
                    .projection((d) => ([d.y, d.x]));
                break;
            }
            case COMMA.ClusterType.Circle: {
                offset = [main.width * 0.5, main.height * 0.5];
                main.layout = D3.layout.cluster()
                    .size([360, main.width * 0.5 - 100])
                    .separation((a, b) => ((a.parent == b.parent ? 1 : 2) / a.depth));
                main.diagonal = D3.svg.diagonal.radial()
                    .projection((d) => ([d.y, d.x / 180 * Math.PI]));
                break;
            }
            default:
                console.log("unknown cluster type");
                return;
        }
        main.chart.attr("transform", "translate(" + offset[0] + "," + offset[1] + ")");
    }
    private nodeText(node: any, type: COMMA.ClusterType) {
        switch (type) {
            case COMMA.ClusterType.Circle: {
                node.append("text")
                    .attr("class", "clusterText")
                    .attr("transform", (d) => (d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"))
                    .attr("dy", ".3em")
                    .style("text-anchor", (d) => (d.x < 180 ? "start" : "end"))
                    .text((d) => d.name);
                break;
            }
            default: {
                node.append("text")
                    .attr("class", "clusterText")
                    .attr("dx", (d) => (d.children ? -8 : 8))
                    .attr("dy", 3)
                    .style("text-anchor", (d) => (d.children ? "end" : "start"))
                    .text((d) => (d.name));
                break;
            }
        }
    }
}
