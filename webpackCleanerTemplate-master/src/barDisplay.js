import * as d3 from "d3"; //d3 is inside the node_modules folder; in library of this setup

export default class BarDisplay{
    constructor(){ //constructor is a function that gets call automatically 

        this.w = 300;
        this.h = 100;
        this.padding = 2;
        this.dataset = [50,10,14,20,25];

        //build a new function
        this.buildChart();
    }

    buildChart(){
        //get element with id of barSpace
        let svg = d3.select("#barSpace")
            .attr("width", this.w)
            .attr("height", this.h);

        svg.selectAll("rect")
            .data(this.dataset)
            .enter()//starts looping process
            .append("rect")
                .attr("x",(d,i) => i *(this.w/this.dataset.length))//d = data, and i = element
                .attr("y", d => this.h-d)
                .attr("width", this.w/this.dataset.length - this.padding)
                .attr("height", d => d)
                .attr("fill", d => `rgb(&{d*10},0,0)`)
    }

}
