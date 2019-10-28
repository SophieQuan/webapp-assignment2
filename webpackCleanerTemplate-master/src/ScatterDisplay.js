//first thing to use to make our chart
import * as d3 from 'd3'; 

//second step
export default class ScatterDisplay{
    constructor(){ //holds w/h of our chart
        this.h = 350;
        this.w = 400;
        this.monthlySales = [
            {"month":10, "sales":100},
            {"month":20, "sales":130},
            {"month":30, "sales":250},
            {"month":40, "sales":300},
            {"month":50, "sales":10},
            {"month":60, "sales":300},
            {"month":70, "sales":0},
            {"month":80, "sales":150},
            {"month":90, "sales":225}
        ]
        this.createScatter();
    }

    salesKPI(d){//d to stand for data

        if(d<50){
            return "#FF0000";
        }
        else{
            return "#00FF00";
        }

    }

    //creating  a min max
    showMinMax(ds, col, val, type){
        let max = d3.max(ds,function(d){
            return d[col];
        });
        let min = d3.min(ds,function(d){
            return d[col];
        });

        if(type == 'minmax' && (val==max || val==min)){
            return val;
        }
        else{
            if(type == 'all'){
                return val;
            }
        }

    }

    createScatter(){
        //selecting our svg to work
        let svg = d3.select("#scatterSpace")//select one particullar element from our html page
            .attr("width", this.w)
            .attr("height", this.h);

        //adding dots
        let dots = svg.selectAll("circle")
            .data(this.monthlySales)
            //to loop through the data .enter
            .enter()
            .append("circle") //appending the circle
                .attr("cx", d => d.month*3)
                .attr("cy", d => this.h - d.sales)
                .attr("r", 7) //raise our points up from bottom, chart them up
                .attr("fill", d => this.salesKPI(d.sales));

        //adding some labels
        let labels = svg.selectAll("text")
            .data(this.monthlySales)
            .enter()
            .append("text")
            .text(d => this.showMinMax(this.monthlySales, 'sales', d.sales, 'all')) //or change 'minmax' to 'all'
                .attr("x", d =>(d.month*3)-28)
                .attr("y", d => this.h - d.sales)
                .attr("font-size", "15px")
                .attr("font-family", "Ariel")
                .attr("fill", "purple")
                .attr("text-anchor","start")
    }

}