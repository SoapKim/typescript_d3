import * as D3 from "d3";
/**
 * 基类，用于定义描述容器信息
 */
export class BaseCase {
    /**
     * 图表自身容器
     */
    protected chart: any;
    /**
     * 容器对应的宽度，可以通过容器属性width获取，由于高频应用故独立
     */
    protected width: number;
    /**
     * 容器对应的高度，可以通过容器属性height获取，由于高频应用故独立
     */
    protected height: number;
    constructor(contain: any, protected padding: any) {
        this.width = contain.attr("width");
        this.height = contain.attr("height");
        this.chart = contain.append("g")
            .attr("width", this.width)
            .attr("height", this.height);
    }
}
