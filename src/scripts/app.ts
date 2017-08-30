import "../styles/base.scss";
// import "d3/d3.min.js"
import * as D3 from "d3";
// 上面引入样式资源文件
// 业务逻辑代码从这里开始写

import { GreeterD3 } from "./greeter";

const greeter: GreeterD3 = new GreeterD3("this istypescritpt test demo");
let dataset = [50, 43, 120, 87, 99, 167, 142];
let baseContain = D3.select("#canvas-frame");
let isFont = true;

greeter.init(dataset, baseContain, isFont);
document.getElementById("sort").onclick= ()=>greeter.sortBar.call(greeter);
document.getElementById("add").onclick=()=> greeter.addData.call(greeter);