import * as D3 from "d3";
/**
 * 散点图，目前不支持半径的动态变化
 */
export class ScatterChart {
    private chart: any;
    constructor(contain: any, private padding: any) {
        this.chart = contain.append("g")
            .attr("width", contain.attr("width"))
            .attr("height", contain.attr("height"));
    }

    public ScatterChart(dataset: any, fillColor: any, r: number, xScale: any, yScale: any) {
        let height = this.chart.attr("height");
        let scatterUpdate = this.chart.selectAll("cirlce")
            .data(dataset);
        let scatterEnter = scatterUpdate.enter();
        let scatterExit = scatterUpdate.exit();
        this.setScatter(scatterUpdate, fillColor, this.padding, xScale, yScale, height, r);
        this.setScatter(scatterEnter.append("circle"), fillColor, this.padding, xScale, yScale, height, r);
        scatterExit.remove();
        return this.chart;
    }
    private setScatter(chart: any, fillColor: any, padding: any, xScale: any, yScale: any, height: number, r: number) {
        chart.attr("fill", fillColor)
            .attr("cx", ((d) => (padding.left + xScale(d[0]))))
            .attr("cy", ((d) => (height - padding.bottom - yScale(d[1]))))
            .attr("r", r);
        return chart;
    }
}