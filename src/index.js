/*
    Bar & line charts based off of the Arctic Mountains &
    Fiords dlimate data from Stats Canada using es6 classes,
    d3, and chart.js

    Created for CWD3500 - Web Application Frameworks
    
    Created by:

    Sabre Harrisson - 100725581
    Sophie - 
    Melissa Khan - 
*/
//IMPORT BAR AND LINE DISPLAYS
import BarDisplay from './BarDisplay';
import LineDisplay from './LineDisplay';

//BAR DISPLAY GRAPH INFORMATION
let barWidth = 1000;
let barHeight = 900;
let barPadding = 10;
let barHolder = "#barSpace";

//LINE DISPLAY CHART INFORMATION
let lnHolder = "#lineSpace";
let lnHeight = 1000;
let lnWidth = 900;

//CREATING THE CHARTS IN THE HTML PAGE
//bar display chart - with respective properties
let newBarHolder = new BarDisplay(barHolder, barWidth, barHeight, barPadding);
//line display chart  - with respective properties
let newLineHolder = new LineDisplay(lnHolder, lnHeight, lnWidth);



