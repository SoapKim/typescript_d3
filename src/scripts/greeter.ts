// 引入three.js
import * as D3 from "d3";

export class GreeterD3 {
  constructor(public greeting: string) {
  }

  public init() {
    const svg = D3.select("#canvas-frame")
      .append("svg")
      .attr("width", "500px")
      .attr("height", "500px");
    const circle = svg.append("circle")
      .attr("cx", "50px")
      .attr("cy", "60px")
      .attr("r", "10px")
      .attr("fill", "red");
  }
};
