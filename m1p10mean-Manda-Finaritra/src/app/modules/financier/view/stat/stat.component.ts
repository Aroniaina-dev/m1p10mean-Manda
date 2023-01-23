import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  chartOptions = {
	  title: {
		  text: "Stat 1"
	  },
	  animationEnabled: true,
	  axisY: {
		includeZero: true
	  },
	  data: [{
		type: "column", //change type to bar, line, area, pie, etc
		//indexLabel: "{y}", //Shows y value on all Data Points
		indexLabelFontColor: "#5A5757",
		dataPoints: [
			{ x: 10, y: 10 },
			{ x: 20, y: 55 },
			{ x: 30, y: 50 },
			{ x: 40, y: 65 },
			{ x: 50, y: 71 },
			{ x: 60, y: 92, indexLabel: "Highest\u2191" },
			{ x: 70, y: 68 },
			{ x: 80, y: 38, indexLabel: "Lowest\u2193"  },
			{ x: 90, y: 54 },
			{ x: 100, y: 60 }
		]
	  }]
	}

  chartOptionsPie = {
	  animationEnabled: true,
	  theme: "dark2",
	  title:{
		text: "Stat 2"
	  },
	  data: [{
		type: "pie",
		startAngle: 45,
		indexLabel: "{name}: {y}",
		indexLabelPlacement: "inside",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 21.3, name: "Facebook" },
		  { y: 27.7, name: "Instagram" },
		  { y: 17, name: "Twitter" },
		  { y: 14.9, name: "LinkedIn" },
		  { y: 10.6, name: "Pinterest" },
		  { y: 8.5, name: "Others" }
		]
	  }]
	}	
}
