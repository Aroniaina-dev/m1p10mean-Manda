import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { User } from 'src/app/models/user';
import { Materiel } from 'src/app/models/materiel';
import { Voiture } from 'src/app/models/voiture';
import {Chart} from "chart.js";

export interface data {
	[key: string]: any;
}
 

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
	loader: boolean = false;
	loaderView: boolean = false;
	load: boolean = false;
	dataResultUser: User[] = [];
	dataResulMateriel: Materiel[] = [];
	ListeVoiture: User[] = [];
	userForm!: FormGroup;
	voitureForm!: FormGroup;
	prixFinalTemp!: number;
	tempsMoyenne: number = 0;
	temporaireTableu: number[] = [];
	listeFinal = [{}];
	listeTemp1 = [new Date(2022, 0, 1) ,new Date(2022, 1, 1),new Date(2022, 2, 2),new Date(2022, 3, 1),new Date(2022, 4, 1),new Date(2022, 5, 1),new Date(2022, 6, 1),new Date(2022, 7, 1),new Date(2022, 8, 1),new Date(2022, 9, 1)];
	listeTemp2 = [10,20,30,40,50,60,70,80,90,100];	
	chartChiffreAffaire!: Chart;
	ctxChiffreAffaire!: HTMLCanvasElement;

  constructor(
    private atelierService: AtelierService,
    ) { 
    }

	ngOnInit(): void {
		this.initData();
		this.getJourMoisDeLAnnee("2021", "01");
		this.initLabel();
	}

	initLabel(): void{		
			
		for (let i = 0; i < this.listeTemp1.length; i++) {
			this.listeFinal.push({x: this.listeTemp1[i], y: this.listeTemp2[i]})			
		}
		this.listeFinal.splice(0,1);
		console.log(this.listeFinal);
		console.log("Manda Aroniaina");
	}


	initData(): void {
		try {
		  this.load = true;
		  this.atelierService.getAllFinancier(0).subscribe((res) => {
			this.dataResultUser = res;
			for (let i = 0; i < this.dataResultUser.length; i++) {
			  for (let j = 0; j < this.dataResultUser[i].voiture.length; j++) {
				for (let k = 0; k < this.dataResultUser[i].voiture[j].materiel.length; k++) {
					const diff = this.calculateDiffDate(this.dataResultUser[i].voiture[j].materiel[k].dateDebutReparation, this.dataResultUser[i].voiture[j].materiel[k].dateFinReparation);
					this.temporaireTableu.push(Number(diff));
				}
			  }
			}
			for (let i = 0; i < this.temporaireTableu.length; i++) {
				this.tempsMoyenne = this.tempsMoyenne + this.temporaireTableu[i];
			}
			this.tempsMoyenne = this.tempsMoyenne / this.temporaireTableu.length;
			this.load = false;
		  });
		} catch (error) {
		  alert(error);
		}
	}

	  

	  stringAsDate(dateStr: string) {
		return new Date(dateStr);
	  }


	calculateDiffDate(dateInitial: string, dateFinal: string): number | string {
		try {
			var timeDiff = Math.abs(this.stringAsDate(dateFinal).getTime() - this.stringAsDate(dateInitial).getTime())
			const tempsFinal = Math.floor(timeDiff /  1000 / 60 / 60 / 24);
			return tempsFinal;
		} catch (e) {
			return 'N/A';
		}
	}

	getJourMoisDeLAnnee(annee:string, mois:string){
		var MonthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
 
		var today = new Date();
		var theYear = 2022;
		var month = new Date(annee+"-"+mois).getMonth();
		var DaysInMonth = MonthDays[month];
		if (month == 1) {
		// February
		if (theYear%400==0 || (theYear%4 == 0 && theYear%100!=0) )
			DaysInMonth +=1;
		}
		// console.log(DaysInMonth);
		return DaysInMonth;
	}

	chartOptionsPie = {
		title: {
			text: "Bénéfice par mois"
		},
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		axisY: {
		  includeZero: true,
		  valueFormatString: "Ar#,##0k"
		},
		data: [{
		  type: "area", //change type to bar, line, area, pie, etc
		  yValueFormatString: "##0kAr",
		  color: "#01b8aa",
		  dataPoints: 
			this.listeFinal
		}]
	  }	


  	chartOptions = {
		title: {
			text: "Bénéfice"
		},
		animationEnabled: true,
		axisY: {
			includeZero: true
		},
		
		data: [{
			type: "donut", //change type to bar, line, area, pie, etc
			indexLabelFontColor: "#5A5757",
			dataPoints: [
				{ x: 1, y: 50 },
				{ x: 2, y: 55 },
				{ x: 3, y: 50 },
				{ x: 4, y: 65 },
				{ x: 5, y: 71 },
				{ x: 6, y: 92 },
				{ x: 7, y: 68 },
				{ x: 8, y: 38 },
				{ x: 9, y: 54 },
				{ x: 10, y: 60 }
			]
		}]
	}


	chart: any;
	isButtonVisible = false;
 
	visitorsChartDrilldownHandler = (e: any) => {
		this.chart.options = this.visitorsDrilldownedChartOptions;	
		this.chart.options.data = this.options[e.dataPoint.name];
		this.chart.options.title = { text: e.dataPoint.name }
		this.chart.render();
		this.isButtonVisible = true;
	}
 
	visitorsDrilldownedChartOptions = {
		animationEnabled: true,
		theme: "light2",
		axisY: {
			gridThickness: 0,
			lineThickness: 1
		},
		data: []
	};
 
	newVSReturningVisitorsOptions = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "Etat en mois et année "
		},
		subtitles: [{
			text: "Cliquez sur n'importe quel segment pour approfondir",
			backgroundColor: "#2eacd1",
			fontSize: 16,
			fontColor: "white",
			padding: 5
		}],
		data: []
	};
 
	options: data = {
		"New vs Returning Visitors": [{
			type: "pie",
			name: "New vs Returning Visitors",
			startAngle: 90,
			cursor: "pointer",
			explodeOnClick: false,
			showInLegend: true,
			legendMarkerType: "square",			
			click: this.visitorsChartDrilldownHandler,
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{ y: 551160, name: "Janvier", color: "#058dc7", indexLabel: "30%" },
				{ y: 329840, name: "Returning Visitors", color: "#50b432", indexLabel: "30%" },
				{ y: 329840, name: "Returning Visitors", color: "#752b15", indexLabel: "40%" }
			]
		}],
		"Janvier": [{
			color: "#058dc7",
			name: "Janvier",
			type: "column",
			dataPoints: [
				{ label: "Jan", y: 42600 },
				{ label: "Feb", y: 44960 },
				{ label: "Mar", y: 46160 },
				{ label: "Apr", y: 48240 },
				{ label: "May", y: 48200 },
				{ label: "Jun", y: 49600 },
				{ label: "Jul", y: 51560 },
				{ label: "Aug", y: 49280 },
				{ label: "Sep", y: 46800 },
				{ label: "Oct", y: 57720 },
				{ label: "Nov", y: 59840 },
				{ label: "Dec", y: 54400 }
			]
		}],
		"Returning Visitors": [{
			color: "#50b432",
			name: "Returning Visitors",
			type: "column",
			dataPoints: [
				{ label: "Jan", y: 21800 },
				{ label: "Feb", y: 25040 },
				{ label: "Mar", y: 23840 },
				{ label: "Apr", y: 24760 },
				{ label: "May", y: 25800 },
				{ label: "Jun", y: 26400 },
				{ label: "Jul", y: 27440 },
				{ label: "Aug", y: 29720 },
				{ label: "Sep", y: 29200 },
				{ label: "Oct", y: 31280 },
				{ label: "Nov", y: 33160 },
				{ label: "Dec", y: 31400 }
			]
		}]
	};
 
	handleClick(event: Event) { 
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options["New vs Returning Visitors"];
		this.chart.render(); 
		this.isButtonVisible = false;
	  } 	
	 
	getChartInstance(chart: object) {
		this.chart = chart;
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options["New vs Returning Visitors"];
		this.chart.render();
	}                              
}
