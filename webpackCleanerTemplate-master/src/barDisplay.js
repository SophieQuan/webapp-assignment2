import * as d3 from "d3"; //d3 is inside the node_modules folder; in library of this setup

export default class BarDisplay{
    constructor(){ //constructor is a function that gets call automatically 

        this.w = 1200;
        this.h = 900;
        this.padding = 2;
        //get the data from the data.json
        //this.dataset = data;

        //build a new function
        //this.buildChart();
        this.fetchData();
    }

    fetchData(){
        fetch('data.json')
        .then(data => data.json())
        .then(data => {
            this.data = data;
            console.log(this.data);
        })
    }

    buildChart(){
        //get element with id of barSpace
        let svg = d3.select("#barSpace")
            .attr("width", this.w)
            .attr("height", this.h);

        svg.selectAll("rect")
            .data(this.precip)
            .enter()//starts looping process
            .append("rect")
                .attr("x",(d,i) => i *(this.w/this.dataset.length))//d = data, and i = element
                .attr("y", d => this.h-d)
                .attr("width", this.w/this.dataset.length - this.padding)
                .attr("height", d => d)
                .attr("fill", d => `rgb(&{d*10},0,0)`)
    }
}
