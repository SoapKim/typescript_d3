import * as D3 from "d3";
import { BaseCase } from "./chart-case";
/**
 * 饼图
 */
export class ArcChart extends BaseCase {
    constructor(contain: any, padding: any) {
        super(contain, padding);
    }
    public ArcChart(dataset: any,
        innerRadius: number, outerRadius: number, fill: any) {
        let arcPath = D3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        let updata = this.chart.selectAll("path").data(dataset);
        let enter = updata.enter().append("path");
        let exit = updata.exit();
        let x = this.width * 0.5;
        let y = this.height - this.padding.bottom;
        this.setArc(updata, arcPath, x, y, fill);
        this.setArc(enter, arcPath, x, y, fill);
        this.updateText(this.chart, dataset, arcPath, x, y);
        exit.remove();
    }
    private setArc(arc: any, path: any,
        x: number, y: number, fill: any) {
        arc.attr("d", (d) => (path(d)))
            .attr("class", "arcInnerPath")
            .attr("transform", "translate(" + x + "," + y + ")")
            .style("fill", (d, i) => (fill(i)));
    }
    private updateText(contain: any, dataset: any, path: any, x: number, y: number) {
        let textUpdate = contain.selectAll("text").data(dataset);
        let textEnter = textUpdate.enter().append("text");
        let textExit = textUpdate.exit();
        this.setText(textUpdate, path, x, y);
        this.setText(textEnter, path, x, y);
        textExit.remove();
    }
    private setText(text: any, path: any, x: number, y: number) {
        text.attr("transform", (d) => ("translate(" + x + "," + y + ")translate(" + path.centroid(d) + ")"))
            .attr("class", "arcInnerText")
            .text((d) => (Math.floor((d.endAngle - d.startAngle) * 180 / Math.PI) + "°"));
    }
}
