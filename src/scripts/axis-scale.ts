import * as D3 from "d3";
import "../styles/style-self.css";
import { COMMA } from "./comma";
/* 轴和坐标系
 */
export class AxisChart {
    /**
     * 绘制坐标轴
     * @param contain  绘制容器
     * @param domain 定义域
     * @param range 值域
     * @param tickValues 刻度个数
     * @param tickFormat 刻度文本样式 
     * @param orient 方向
     * @param x 绘制起点x
     * @param y 绘制起点y
     */
    public AxisChartTickValues(contain: any,
        tickValue: any, tickFormat: string, innerTick: number, outerTick: number,
        scale: any, orient: string, x: number, y: number) {
        let axis = this.Axis(scale, orient, innerTick, outerTick, tickFormat);
        if(tickValue){
            axis.tickValues(tickValue);
        }
        let gAxis = contain.append("g")
            .attr("transform", "translate(" + x + "," + y + ")")
            .attr("class", "axis")
            .call(axis);
        return gAxis;
    }
    /**
     * 绘制坐标轴
     * @param contain  绘制容器
     * @param domain 定义域
     * @param range 值域
     * @param ticks 刻度个数
     * @param tickFormat 刻度文本样式 
     * @param orient 方向
     * @param x 绘制起点x
     * @param y 绘制起点y
     */
    public AxisChart(contain: any,
        ticks: number, tickFormat: string, innerTick: number, outerTick: number,
        scale: any, orient: string, x: number, y: number) {
        let axis = this.Axis(scale, orient, innerTick, outerTick, tickFormat);
        if(ticks){
            axis.ticks(ticks);
        }
        let gAxis = contain.append("g")
            .attr("transform", "translate(" + x + "," + y + ")")
            .attr("class", "axis")
            .call(axis);
        return gAxis;
    }
    /**
     * 获取比例尺
     * @param domain 定义域
     * @param range 值域
     * @param type 比例尺类型
     * @param arg 比例尺参数
     */
    public Scale(domain: any, range: any, type: COMMA.ScaleType, arg: any) {
        switch (type) {
            case COMMA.ScaleType.Linear: {
                return D3.scale.linear()
                    .domain(domain)
                    .range(range);
            }
            case COMMA.ScaleType.Pow: {
                return D3.scale.pow()
                    .exponent(arg[0])
                    .domain(domain)
                    .range(range);
            }
            case COMMA.ScaleType.Log: {
                return D3.scale.log()
                    .domain(domain)
                    .range(range);
            }
            case COMMA.ScaleType.Ordinal:{
                return D3.scale.ordinal()
                    .domain(domain)
                    .rangeRoundBands(range,arg[0]);
            }
            default:
                return null;
        }
    }
    /**
     * 构建坐标轴，不处理ticks与tickvalues问题
     * @param scale 比例关系
     * @param orient 方向
     * @param innerTick 内部的刻度长度 
     * @param outerTick 外部的刻度长度
     * @param tickFormat 刻度值的格式化
     */
    private Axis(scale: any, orient: string, innerTick: number, outerTick: number, tickFormat: string) {
        let axis = D3.svg.axis()
            .scale(scale)
            .orient(orient);
        if (innerTick && outerTick) {
            axis.tickSize(innerTick, outerTick);
        }
        if (tickFormat) {
            axis.tickFormat(D3.format(tickFormat));
        }
        return axis;
    }
}
