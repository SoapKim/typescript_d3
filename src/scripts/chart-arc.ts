import * as D3 from "d3";
/**
 * 饼图
 */
export class ArcChart {
    private chart: any;
    constructor(contain: any,private padding: any) {
        this.chart = contain.append("g")
            .attr("width", contain.attr("width"))
            .attr("height", contain.attr("height"));
    }
    public ArcChart(dataset: any,
        innerRadius: number, outerRadius: number,
        stroke: any, strokeWidth: number, fill: any,
        anchor: string, fontSize: number, fontColor: any) {
        let arcPath = D3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        let updata = this.chart.selectAll("path").data(dataset);
        let enter = updata.enter().append("path");
        let exit = updata.exit();
        let x = this.chart.attr("width") * 0.5;
        let y = this.chart.attr("height") - this.padding.bottom;
        this.setArc(updata, arcPath, x, y, stroke, strokeWidth, fill);
        this.setArc(enter, arcPath, x, y, stroke, strokeWidth, fill);
        this.updateText(this.chart, dataset, arcPath, x, y, anchor, fontSize, fontColor);
        exit.remove();
    }
    private setArc(arc: any, path: any,
        x: number, y: number, stroke: any, strokeWidth: number, fill: any) {

        arc.attr("d", (d) => (path(d)))
            .attr("transform", "translate(" + x + "," + y + ")")
            .style({
                "stroke": stroke,
                "stroke-width": strokeWidth,
                "fill": (d, i) => (fill(i)),
            });
    }
    private updateText(contain: any, dataset: any, path: any, x: number, y: number,
        anchor: string, fontSize: any, fontColor: any) {
        let textUpdate = contain.selectAll("text").data(dataset);
        let textEnter = textUpdate.enter().append("text");
        let textExit = textUpdate.exit();
        this.setText(textUpdate, path, x, y, anchor, fontColor, fontSize);
        this.setText(textEnter, path, x, y, anchor, fontColor, fontSize);
        textExit.remove();
    }
    private setText(text: any, path: any, x: number, y: number,
        anchor: string, fontSize: any, fontColor: any) {
        text.attr("transform", (d) => ("translate(" + x + "," + y + ")translate(" + path.centroid(d) + ")"))
            .style({
                "text-anchor": anchor,
                "fill": fontColor,
                "font-size": fontSize,
            })
            .text((d) => (Math.floor((d.endAngle - d.startAngle) * 180 / Math.PI) + "°"));
    }
}