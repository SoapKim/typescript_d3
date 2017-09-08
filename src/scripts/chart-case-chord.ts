import * as D3 from "d3";
import { BaseCase } from "./chart-case";
/**
 * 弦图，用于描述几个事物之间的关联关系
 * 例如：各大洲的人口流入与流出情况
 * 各保护区动植物物种之间的迁移迁徙
 */
export class ChordChartCase extends BaseCase {
    constructor(contain: any, padding: any) {
        super(contain, padding);
        this.chart.attr("transform", "translate(" + this.width * 0.5 + "," + this.height * 0.5 + ")");
    }
    /**
     * 弦图
     * @param domain 
     * @param range n*n规则矩阵数组
     * @param pad 
     * @param sort 
     */
    public ChordChart(domain: any, range: any,
        pad: number, sort: any, color: any) {
        let chord = D3.layout.chord()
            .padding(pad)
            .sortSubgroups(sort)
            .matrix(range);
        let innerRadius = this.width * 0.35;// 0.5*0.7;
        let outer = this.addOuter(chord, color, domain, innerRadius);
        let inner = this.addInner(chord, innerRadius, color);
        outer.selectAll(".chordOuterPath")
            .on("mouseover", this.fade(0.0, inner))
            .on("mouseout", this.fade(1.0, inner));
    }
    private addOuter(chord: any, color: any, domain: any, innerRadius: any) {
        let gOuter = this.chart.append("g");
        let outRadius = innerRadius * 1.1;
        let arcOuter = D3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outRadius);
        gOuter.selectAll(".chordOuterPath")
            .data(chord.groups())
            .enter()
            .append("path")
            .attr("class", "chordOuterPath")
            .style("fill", (d) => (color(d.index)))
            .attr("d", arcOuter);
        gOuter.selectAll(".chordOuterText")
            .data(chord.groups())
            .enter()
            .append("text")
            .each((d, i) => {
                d.angle = (d.startAngle + d.endAngle) * 0.5;
                d.name = domain[i];
            })
            .attr("class", "chordOuterText")
            .attr("dy", ".35em")
            .attr("transform", (d) => {
                let res = "rotate(" + (d.angle * 180 / Math.PI) + ")";
                res += "translate(0," + (-(outRadius + 10)) + ")";
                if (d.angle > Math.PI * 3 * 0.25 && d.angle < Math.PI * 5 * 0.25) {
                    res += "rotate(180)";
                }
                return res;
            })
            .text((d) => (d.name));
        return gOuter;
    }
    private addInner(chord: any, innerRadius: number, color: any) {
        let gInner = this.chart.append("g");
        let arcInner = D3.svg.chord()
            .radius(innerRadius);
        gInner.selectAll(".chordInnerPath")
            .data(chord.chords())
            .enter()
            .append("path")
            .attr("class", "chordInnerPath")
            .attr("d", arcInner)
            .style("fill", (d) => (color(d.source.index)));
        return gInner;

    }
    private fade(opacity: number, gInner: any) {
        // 返回一个function(g, i)
        return (g, i) => {

            gInner.selectAll(".chordInnerPath")	// 选择所有的弦
                .filter((d) => { 	// 过滤器
                    // 没有连接到鼠标所在节点的弦才能通过
                    return d.source.index != i && d.target.index != i;
                })
                .transition()	// 过渡
                .style("opacity", opacity);	// 透明度
        }
    }
}
