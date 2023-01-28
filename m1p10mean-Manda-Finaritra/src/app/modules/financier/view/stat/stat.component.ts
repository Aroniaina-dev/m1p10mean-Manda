import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { User } from 'src/app/models/user';
import { Materiel } from 'src/app/models/materiel';
import { Voiture } from 'src/app/models/voiture';
import { Chart } from "chart.js";
import { VoitureTemp } from 'src/app/models/voitureTemp';
import { HttpResponseModel } from "../../../../models/http-response-model";
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

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
	dataResultUserBenefice: User[] = [];
	dataResulMateriel: Materiel[] = [];
	ListeVoiture: User[] = [];
	userForm!: FormGroup;
	beneficeForm!: FormGroup;
	voitureForm!: FormGroup;
	prixFinalTemp!: number;
	tempsMoyenne: number = 0;
	temporaireTableu: number[] = [];
	listeFinal = [{}];
	dataYear = [{}];
	listeMois = [new Date(2022, 0, 1), new Date(2022, 1, 1), new Date(2022, 2, 2), new Date(2022, 3, 1), new Date(2022, 4, 1), new Date(2022, 5, 1), new Date(2022, 6, 1), new Date(2022, 7, 1), new Date(2022, 8, 1), new Date(2022, 9, 1), new Date(2022, 10, 1)];
	listeValeurInitialBenefice = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	chartChiffreAffaire!: Chart;
	ctxChiffreAffaire!: HTMLCanvasElement;
	yearSelected = 2022;
	dataJanv = [];
	dataFev = [];
	dataMars = [];
	salaire = 5000;
	loyer = 5000;
	autreDepenseParMois = 0;


	listeVoitureTemp!: VoitureTemp[];

	constructor(
		private atelierService: AtelierService,
		private fB: FormBuilder,
	) {
	}

	ngOnInit(): void {
		this.getInitialDataVoiture();
		this.getAllVoitureTempBase();
		this.initData();
		this.getJourMoisDeLAnnee("2021", "05");
		this.initLabel();
		this.initFormBenefice();

	}

	initFormBenefice(): void {
		this.beneficeForm = this.fB.group({
			salaire: [this.salaire],
			loyer: [this.loyer],
			autreDepenseParMois: [this.autreDepenseParMois],
		});
	}

	get c(): any {
		return this.beneficeForm.controls;
	}





	getAllVoitureTempBase(): void {
		try {
			this.load = true;
			// this.atelierService.getAllVoitureTemp().subscribe((res) => {
			// 	this.listeVoitureTemp = res;
			// 	for (let i = 0; i < this.listeVoitureTemp.length; i++) {
			// 		for (let j = 0; j < this.listeVoitureTemp[i].reparation.length; j++) {
			// 			const diff = this.calculateDiffDate(this.listeVoitureTemp[i].reparation[j].dateDebutReparation, this.listeVoitureTemp[i].reparation[j].dateFinReparation);
			// 			this.temporaireTableu.push(Number(diff));
			// 		}
			// 	}

			// 	for (let i = 0; i < this.temporaireTableu.length; i++) {
			// 		this.tempsMoyenne = this.tempsMoyenne + this.temporaireTableu[i];
			// 	}

			// 	console.log(this.tempsMoyenne);
			// 	this.tempsMoyenne = this.tempsMoyenne / this.temporaireTableu.length;
			// 	this.load = false;
			// });
		} catch (error) {
			alert(error);
		}
		console.log(this.listeVoitureTemp);
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
			var timeDiff = 0;
			timeDiff = Math.abs(this.stringAsDate(dateFinal).getTime() - this.stringAsDate(dateInitial).getTime())
			return Math.floor(timeDiff / 1000 / 60 / 60 / 24);
		} catch (e) {
			return 'N/A';
		}
	}

	getInitialDataVoiture() {
		this.load = true;
		let totalQuestions: VoitureTemp[];
		
	}

	async initLabel(): Promise<void> {
		for (let i = 0; i < this.listeMois.length; i++) {
			if (this.listeMois[i].getFullYear() == 2022) {
				this.listeFinal.push({ x: this.listeMois[i], y: this.listeValeurInitialBenefice[i] })
			} else {
				this.listeMois.splice(i, 1);
				this.listeValeurInitialBenefice.splice(i, 1);
			}
		}
		this.listeFinal.splice(0, 1);
		let result: HttpResponseModel<VoitureTemp[]>;
		result = await this.atelierService.getAllVoitureTemp().getData().toPromise();

	}

	getJourMoisDeLAnnee(annee: string, mois: string) {
		var MonthDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		var theYear = 2022;
		var month = new Date(annee + "-" + mois).getMonth();
		var DaysInMonth = MonthDays[month];
		if (month == 1) {
			if (theYear % 400 == 0 || (theYear % 4 == 0 && theYear % 100 != 0)) {
				DaysInMonth += 1;
			}
		}
		return DaysInMonth;
	}

	chartOptionsPie = {
		title: {
			text: "Bénéfice par mois"
		},
		animationEnabled: true,
		theme: "light2",
		axisX: {
			valueFormatString: "MMM",
			intervalType: "month",
			interval: 1
		},
		axisY: {
			title: "Bénéfice",
			suffix: "Ar"
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			itemclick: function (e: any) {
				if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else {
					e.dataSeries.visible = true;
				}
				e.chart.render();
			}
		},
		data: [{
			type: "line",
			name: "Bénéfice",
			showInLegend: true,
			yValueFormatString: "#,###Ar",
			dataPoints: this.listeFinal
			// [		
			// 	{ x: new Date(2021, 0, 1), y: 27 },
			// 	{ x: new Date(2021, 1, 1), y: 28 },
			// 	{ x: new Date(2021, 2, 1), y: 35 },
			// 	{ x: new Date(2021, 3, 1), y: 45 },
			// 	{ x: new Date(2021, 4, 1), y: 54 },
			// 	{ x: new Date(2021, 5, 1), y: 64 },
			// 	{ x: new Date(2021, 6, 1), y: 69 },
			// 	{ x: new Date(2021, 7, 1), y: 68 },
			// 	{ x: new Date(2021, 8, 1), y: 61 },
			// 	{ x: new Date(2021, 9, 1), y: 50 },
			// 	{ x: new Date(2021, 10, 1), y: 41 },
			// 	{ x: new Date(2021, 11, 1), y: 33 }
			// ]
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
			text: "Etat en mois "
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

	initChartChiffreDAffaire() {
		const listeAnnee = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
			"Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
		this.dataYear = [{}];
		let compteDay = this.getJourMoisDeLAnnee("2022", "01");

	}

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
				{ id: 0, y: 551160, name: "Janvier", color: "#058dc7", indexLabel: "Jan 8,3%" },
				{ id: 1, y: 329840, name: "Fevrier", color: "#50b432", indexLabel: "Fev 8,3%" },
				{ id: 2, y: 329840, name: "Mars", color: "#752b15", indexLabel: "Mar 8,3%" },
				{ id: 3, y: 329840, name: "Avril", color: "#FDF5E6", indexLabel: "Apr 8,3%" },
				{ id: 4, y: 329840, name: "Mai", color: "#00CED1", indexLabel: "Mai 8,3%" },
				{ id: 5, y: 329840, name: "Juin", color: "#FF7F50", indexLabel: "Jun 8,3%" },
				{ id: 6, y: 329840, name: "Juillet", color: "#FFA07A", indexLabel: "Jul 8,3%" },
				{ id: 7, y: 329840, name: "Aout", color: "#DEB887", indexLabel: "Aou 8,3%" },
				{ id: 8, y: 329840, name: "Septembre", color: "#9ACD32", indexLabel: "Sep 8,3%" },
				{ id: 9, y: 329840, name: "Octobre", color: "#00CED1", indexLabel: "Oct 8,3%" },
				{ id: 10, y: 329840, name: "Novembre", color: "#66CDAA", indexLabel: "Nov 8,3%" },
				{ id: 11, y: 329840, name: "Decembre", color: "#B0C4DE", indexLabel: "Dec 8,3%" }
			]
		}],
		"Janvier": [{
			color: "#058dc7",
			name: "Janvier",
			type: "column",
			dataPoints: [
				{ label: "1", y: 42600 },
				{ label: "2", y: 44960 },
				{ label: "3", y: 46160 },
				{ label: "4", y: 48240 },
				{ label: "5", y: 48200 },
				{ label: "6", y: 49600 },
				{ label: "7", y: 51560 },
				{ label: "8", y: 49280 },
				{ label: "9", y: 46800 },
				{ label: "10", y: 57720 },
				{ label: "11", y: 59840 },
				{ label: "12", y: 54400 },
				{ label: "13", y: 42600 },
				{ label: "14", y: 44960 },
				{ label: "15", y: 46160 },
				{ label: "16", y: 48240 },
				{ label: "17", y: 48200 },
				{ label: "18", y: 49600 },
				{ label: "19", y: 51560 },
				{ label: "20", y: 49280 },
				{ label: "21", y: 46800 },
				{ label: "22", y: 57720 },
				{ label: "23", y: 59840 },
				{ label: "24", y: 54400 },
				{ label: "25", y: 51560 },
				{ label: "26", y: 49280 },
				{ label: "27", y: 46800 },
				{ label: "28", y: 57720 },
				{ label: "29", y: 59840 },
				{ label: "30", y: 54400 },
				{ label: "31", y: 54400 },
			]
		}],
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
