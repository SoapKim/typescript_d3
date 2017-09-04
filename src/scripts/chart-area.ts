import * as D3 from "d3";
import { COMMA } from "./comma";
/**
 * 区域图
 * 用于表述有包含关系的事物，例如覆盖率等
 */
export class AreaChart {
    private chart: any;
    constructor(private dataset: any, contain: any, private padding: any,
        private fillColor: any, private stroke: any, private strokeWidth: number) {
        this.chart = contain.append("g")
            .attr("width", contain.attr("width"))
            .attr("height", contain.attr("height"));
    }

    public AreaChart(direct: string,interpolate:any) {
        let areaPath: any;
        if (direct == COMMA.Constant.ORINET.left ||
            direct == COMMA.Constant.ORINET.right) {
            areaPath = this.HorizontalArea(this.chart.attr("width"), this.padding);
        } else {
            areaPath = this.VerticalArea(this.chart.attr("width"), this.padding);
        }
        areaPath.interpolate(interpolate);
        // path
        this.chart.append("path")
            .attr("d", areaPath(this.dataset))
            .style({
                "stroke": this.stroke,
                "stroke-width": this.strokeWidth,
                "fill": this.fillColor,
            });
    }
    private VerticalArea(height: number, padding: any) {
        return D3.svg.area()
            .x((d, i) => (50 + i * 80))
            .y0((d, i) => ((height - padding.bottom) * 0.5))
            .y1((d, i) => ((height - padding.bottom) * 0.5 - d));
    }
    
    private HorizontalArea(width: number, padding: any) {
        return D3.svg.area()
            .y((d, i) => (50 + i * 80))
            .x1((d, i) => ((width - padding.left) * 0.5))
            .x0((d, i) => ((width - padding.left) * 0.5 - d));
    }
}