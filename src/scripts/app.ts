import "../styles/base.scss";
// import "d3/d3.min.js"
// import * as D3 from "d3";
// 上面引入样式资源文件
// 业务逻辑代码从这里开始写

import { GreeterD3 } from "./greeter";

const greeter: GreeterD3 = new GreeterD3("this istypescritpt test demo");

greeter.init();
