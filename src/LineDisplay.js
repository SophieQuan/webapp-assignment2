import * as d3 from 'd3';

export default class LineDisplay {
    constructor(graphData, lnHolder, lnHeight, lnWidth) {
        this.h = lnHeight;
        this.w = lnWidth;
        this.holder = lnHolder;
        this.temp = graphData;
        this.lineFun = d3.line()
            .x(d => d.year * 3)
            .y(d => this.h - d.temp)
            .curve(d3.curveLinear); //can also be b-spline by using the term basis

        this.buildLineChart();
    }

    buildLineChart() {
        let svg = d3.select(this.holder)
            .attr("width", this.w)
            .attr("height", this.h);

        let viz = svg.append("path")
            .attr("d", this.lineFun(this.temp.data))
            .attr("stroke", "purple")
            .attr("stroke-width",2)
            .attr("fill", "none")
            
        let labels = svg.selectAll("text")
            .data(this.temp.data)
            .enter()
            .append("text")
            .text(d => d.year)
            .attr("x",d => (d.year * 3) - 25)
            .attr("y",d => this.h - d.temp)
            .attr("font-size", "12px")
            .attr("font-family", "sans-serif")
            .attr("fill", "#666")
            .attr("text-anchor", "start")
            .attr("dy", "0.35em")
            .attr("font-weight",(d, i) => {
                if (i === 0 || i === (this.temp.data.length - 1)) {
                    return "bold";
                } else {
                    return "normal";
                }
            })
    }
}