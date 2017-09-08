import * as D3 from "d3";
import { BaseCase } from "./chart-case";
import { COMMA } from "./comma";
/**
 * 分区图，用于表示物种包含层次关系
 */
export class PartitionChartCase extends BaseCase {
    private type: COMMA.PartitionType;
    private dataset: any;
    private color: any;
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }

    public PartitionChartCase(data: string, color: any, type: COMMA.PartitionType) {
        let main = this;
        D3.json(data, (error, root) => {
            if (error) {
                console.log(error);
                return;
            }
            this.dataset = root;
            this.color = color;
            main.analysNode(main, type);
        });
    }
    public updateParitionType(type: COMMA.PartitionType) {
        if (this.type == type) {
            return;
        }
        if (!this.dataset) {
            console.log("数据初始化操作失败！");
            return;
        }
        this.type = type;
        this.chart.selectAll("g").remove();
        this.analysNode(this, this.type);
    }
    private analysNode(main: any, type: COMMA.PartitionType) {
        let range: any;
        switch (type) {
            case COMMA.PartitionType.Partition: {
                range = [main.width, main.height];
                break;
            }
            case COMMA.PartitionType.Circle: {
                let radius = Math.min(main.width, main.height) * 0.5;
                range = [2 * Math.PI, radius * radius];
                break;
            }
            default:
                console.log("undeal type");
                break;
        }
        let partition = D3.layout.partition()
            .sort(null)
            .size(range)
            .value((d) => 1);
        let nodes = partition.nodes(main.dataset);
        let links = partition.links(nodes);
        // 
        let contain = main.chart.selectAll("g")
            .data(nodes)
            .enter()
            .append("g");
        switch (type) {
            case COMMA.PartitionType.Partition: {
                this.Parition(contain, main.color);
                break;
            }
            case COMMA.PartitionType.Circle: {
                contain.attr("transform", "translate(" + main.width * 0.5 + "," + main.height * 0.5 + ")");
                this.ParitionCircle(contain, main.color);
                break;
            }
            default:
                console.log(type + "unknonw type");
                break;
        }
    }
    private Parition(contain: any, color: any) {
        contain.append("rect")
            .attr("class", "paritionRect")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("width", (d) => d.dx)
            .attr("height", (d) => d.dy)
            .style("fill", (d) => color((d.children ? d : d.parent).name));
        contain.append("text")
            .attr("class", "paritionNodeText")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("dx", 10)
            .attr("dy", 20)
            .text((d, i) => d.name);
    }
    private ParitionCircle(contain: any, color: any) {
        let arc = D3.svg.arc()
            .startAngle((d) => d.x)
            .endAngle((d) => d.x + d.dx)
            .innerRadius((d) => Math.sqrt(d.y))
            .outerRadius((d) => Math.sqrt(d.y + d.dy));
        contain.append("path")
            .attr("class", "paritionPath")
            .attr("display", (d) => (d.depth ? null : "none"))// 圆中心的弧不绘制
            .attr("d", arc)	// 使用弧生成器            
            .style("fill", (d) => color((d.children ? d : d.parent).name));
        contain.append("text")
            .attr("class", "paritionNodeCircleText")
            .attr("dy", ".5em")
            .attr("transform", (d, i) => {
                if (i !== 0) {		// 除圆中心的文字外，都进行平移旋转
                    let r = d.x + d.dx / 2;	// 旋转角度
                    // 超过180°的文字调整旋转角度，防止文字是倒的
                    let angle = Math.PI / 2;
                    r += r < Math.PI ? (angle * -1) : angle;
                    r *= 180 / Math.PI;
                    return "translate(" + arc.centroid(d) + ")" +
                        "rotate(" + r + ")";
                }
            })
            .text((d, i) => d.name);
    }
}
