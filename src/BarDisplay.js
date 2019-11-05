// SOPHIE & MELLISSA : 
// NOTE ON LINE 30 FOR YOU GUYS
// LINE 122 TO CHANGE THE FONTS FOR LABELS
// LINE 90 TO CHANGE THE COLOURS OF THE BARS USING RGBA
// TO DO LIST: 
// 1. The years scale is in the wrong spot
// 2. Can we make the bars thicker?
// 3. Change the scale to show every year instead of going by 5
// 4. Add a legend
// 5. Line Chart - working on this now
import * as d3 from "d3";

//creating the barDisplay - Bar Chart
export default class BarDisplay {
    //taking the information/properties from index.js
    constructor(barHolder, barWidth, barHeight, padding) {
        this.w = barWidth;
        this.h = barHeight;
        this.padding = padding;
        this.barHolder = barHolder;
        this.dataset;
        //since fetch data from index.js is not working - we put it back inside here
        this.fetchData();
    }
    //starting to build the chart 
startChart() {
    //checking to see if the data array is showing up - USED FOR DEBUG
    //console.log(this.dataset);

    // set the width and height og the svg
    //create the svg as the graph
    let svg = d3.select(this.barHolder)
        .attr("width", this.w+150)
        //add extra height to show negative values
        .attr("height", this.h+200);

    // create the scale of the graph
    let scale = d3.scaleLinear()
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CAN ANYONE FIGURE THIS OUT???? THESE ARE NOT OUR NUMBERS - cant find the correct range - try google maybe?
        //the lowest and highest numbers of the temp
        .domain([-27, 42])
        //the span(range) of the y axis - allowing the negative numbers to show
        .range([-81, 126]);

    // add the scale/numbers to the x axis
    let xScale = d3.scaleLinear()
        //the domain is the lowest year to the highest year
        .domain([1970, 2010])
        //the range is the width of the dataset (year)
        .range([0, this.w-(this.w / this.dataset.length)]);

    //creating the x axis using the year nums
    let xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));

    //add the scale to the y axis
    let yScale = d3.scaleLinear()
        //the lowest number for bottom of scale to the highest
        .domain([-50, 100])
        //the height of the scale nums
        .range([this.h - scale(-70), this.h-scale(100)]);

    //create the y axis using the scale of the yScale
    let yAxis = d3.axisLeft(yScale);

    // append the new group of the rect (bars)
    svg.append('g')
        .attr('transform', function(d) {
            return 'translate(32, -510)';
        })
        //create the rects
        .selectAll("rect")
            //usse the data
            .data(this.dataset)
            .enter()
            .append("rect")
            //the width position
            .attr("x", (d, i) => i * (this.w / this.dataset.length))
            //the height is the precipitation 
            .attr("y", d =>{
                //get the height by using an if statement in case of neg nums
                if (d.precip > 0){
                    return this.h - scale(d.precip);
                } else {
                    return this.h;
                }
            })
            //the width plus the padding
            .attr("width", this.w / this.dataset.length - this.padding)
            //change the height by finding the absolute number of the height
            .attr("height", d => scale(Math.abs(d.precip)))
            //changing the colours of the bars
            .attr("fill",d => {
                if (d.precip > 0) {
                    //change it to a brighter colours - pinks
                    return `rgb(${Math.abs(d.precip)*50},0,130)`;
                } else {
                    //if its less than 0 change the colour to darker colours - orange/fall
                    return `rgb(${Math.abs(d.precip)*20},140,67)`;
                }
            });

    // append the group of labels 
    svg.append('g')
        //create the classes for the labels
        .attr('class','labels')
        //get all the text
        .selectAll("text")
            //get the data
            .data(this.dataset)
            .enter()
            //make the text go to the proper positions
            .append("text")
                    //move the text over to be on top the bar - the middle of the bar
                    .attr('transform', 'translate(30, -510)')
                    //make the text be the label of the precipitation its on
                    .text(d => d.precip)
                    //get the x attribute to be 10 higher than the bar
                    .attr("x",(d ,i)=> i * (this.w / this.dataset.length)+10)
                    .attr("y",(d) => {
                        if (d.precip > 0) {
                            //make the label 15px lower
                            return this.h-scale(d.precip)-15;
                        } else {
                            //make the label 15 px higher
                            return this.h-scale(d.precip)+15;
                        }
                    })
                    //change the fill of the labels
                    .attr("fill", "#7CFC00")
                    //change the font size
                    .attr("font-size", "15px")

    // append the group of nums and insert x axis
    svg.append('g')
    .attr('class','xlabel')
    //move it to bottom of y axis
    .attr('transform', 'translate(32, 550)')
    //call the x axis
    .call(xAxis);

    // append the group of nums and insert y axis
    svg.append('g')
    //move up the page
    .attr('transform', 'translate(30, -550)')
    //call the y axis
    .call(yAxis);

    //END OF START CHART
    }

    //we will fetch the external data here first
    //fetching all the data from the data.json using an es6 function
    fetchData(){
        fetch('data.json')
        .then(data => data.json())
        .then(data => {
            this.dataset = data.data;
            //start building the chart
            this.startChart();
        });
    }

 // END OF BAR DISPLAY
}
