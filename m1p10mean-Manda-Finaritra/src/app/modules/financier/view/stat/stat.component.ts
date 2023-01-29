import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AtelierService } from 'src/app/services/AtelierService/atelier.service';
import { User } from 'src/app/models/user';
import { Materiel } from 'src/app/models/materiel';
import { Chart } from "chart.js";
import { VoitureTemp } from 'src/app/models/voitureTemp';
import { HttpClient } from '@angular/common/http';



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
	listeFinal = [{ x: new Date(), y: 0 }];
	chartDayMonth = [{ label: "1", y: 0 }];
	chartDayMonthFevrier = [{ label: "1", y: 0 }];
	chartDayMonthMars = [{ label: "1", y: 0 }];
	chartDayMonthAvril = [{ label: "1", y: 0 }];
	chartDayMonthMai = [{ label: "1", y: 0 }];
	chartDayMonthJuin = [{ label: "1", y: 0 }];
	chartDayMonthJuillet = [{ label: "1", y: 0 }];
	chartDayMonthAout = [{ label: "1", y: 0 }];
	chartDayMonthSeptembre = [{ label: "1", y: 0 }];
	chartDayMonthOctobre = [{ label: "1", y: 0 }];
	chartDayMonthNovembre = [{ label: "1", y: 0 }];
	chartDayMonthDecembre = [{ label: "1", y: 0 }];
	infoOnClick = { id: 0, y: 0, name: "", color: "", indexLabel: "" };
	dataYear = [{}];
	listeMois = [new Date(2022, 0, 1), new Date(2022, 1, 1), new Date(2022, 2, 2), new Date(2022, 3, 1), new Date(2022, 4, 1), new Date(2022, 5, 1), new Date(2022, 6, 1), new Date(2022, 7, 1), new Date(2022, 8, 1), new Date(2022, 9, 1), new Date(2022, 10, 1)];
	listeValeurInitialBenefice = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	chartChiffreAffaire!: Chart;
	ctxChiffreAffaire!: HTMLCanvasElement;
	yearSelected = 2022;
	dataJanv = [];
	dataFev = [];
	dataMars = [];
	karama = 50;
	loyer = 50;
	autreDepenseParMois = 0;
	data!: VoitureTemp[];
	myNumber!: number;

	listeVoitureTemp!: VoitureTemp[];

	constructor(
		private atelierService: AtelierService,
		private fB: FormBuilder,
	) {
	}

	async ngOnInit(): Promise<void> {
		this.data = await this.atelierService.getAllVoitureTemp().toPromise() as VoitureTemp[];
		this.getAllVoitureTempBase();
		this.getJourMoisDeLAnnee("2021", "05");
		this.initLabel();
		await this.initFormBenefice();
		this.initChartBeneficeParJour("01");
	}

	initFormBenefice(): void {
		this.beneficeForm = this.fB.group({
			
			loyer: [this.loyer],
			karama: [this.karama],
			autreDepenseParMois: [this.autreDepenseParMois],
		});
	}

	get c(): any {
		return this.beneficeForm.controls;
	}

	getAllVoitureTempBase(): void {
		try {
			this.load = true;
			this.atelierService.getAllVoitureTemp().subscribe((res) => {
				this.listeVoitureTemp = res;
				for (let i = 0; i < this.listeVoitureTemp.length; i++) {
					for (let j = 0; j < this.listeVoitureTemp[i].reparation.length; j++) {
						const diff = this.calculateDiffDate(this.listeVoitureTemp[i].reparation[j].dateDebutReparation, this.listeVoitureTemp[i].reparation[j].dateFinReparation);
						this.temporaireTableu.push(Number(diff));
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

	tesFunction(){
		console.log(this.karama);
		console.log(this.loyer);
		console.log(this.autreDepenseParMois);
	}

	initLabel(): void {
		
		for (let i = 0; i < this.listeMois.length; i++) {
			if (this.listeMois[i].getFullYear() == 2022) {
				this.listeFinal.push({ x: this.listeMois[i], y: this.listeValeurInitialBenefice[i] })
			} else {
				this.listeMois.splice(i, 1);
				this.listeValeurInitialBenefice.splice(i, 1);
			}
		}
		this.listeFinal.splice(0, 1);


		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data[i].reparation.length; j++) {
				let mois = this.stringAsDate(this.data[i].reparation[j].dateFinReparation).getMonth() + 1;
				let price = this.data[i].reparation[j].prix;
				let piecePrice = this.data[i].reparation[j].prixPiece;
				let valeurFinal = price - piecePrice - this.karama - this.loyer - this.autreDepenseParMois;
				this.listeFinal[mois].y = valeurFinal;
			}

		}
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

	async initChartBeneficeParJour(month: string) {
		const listeJour = this.getJourMoisDeLAnnee("2022", month);
		
		for (let i = 1; i <= listeJour; i++) {
			for (let j = 0; j < this.data.length; j++) {
				for (let k = 0; k < this.data[j].reparation.length; k++) {
					const getMoisId = this.stringAsDate(this.data[j].reparation[k].dateFinReparation).getMonth();
					if(i == getMoisId){
						if(getMoisId ==1){
							this.chartDayMonth.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId ==2){
							this.chartDayMonthFevrier.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId ==3){
							this.chartDayMonthMars.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId ==4){
							this.chartDayMonthAvril.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId ==5){
							this.chartDayMonthMai.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId ==6){
							this.chartDayMonthJuin.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId ==7){
							this.chartDayMonthJuillet.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId ==8){
							this.chartDayMonthAout.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId == 9){
							this.chartDayMonthSeptembre.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId == 10){
							this.chartDayMonthOctobre.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId == 11){
							this.chartDayMonthNovembre.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}
						else if(getMoisId == 12){
							this.chartDayMonthDecembre.push({ label: getMoisId.toString(), y: this.data[j].reparation[k].prix })
						}

					}
					else{
						if(i<=30){
							this.chartDayMonthAvril.push({ label: i.toString(), y: 0 });							
							this.chartDayMonthJuin.push({ label: i.toString(), y: 0 });							
							this.chartDayMonthSeptembre.push({ label: i.toString(), y: 0 });
							this.chartDayMonthNovembre.push({ label: i.toString(), y: 0 });
						}
						if(i<=28){
							this.chartDayMonthFevrier.push({ label: i.toString(), y: 0 });
						}
						if(i<31){
							this.chartDayMonth.push({ label: i.toString(), y: 0 });
							this.chartDayMonthMars.push({ label: i.toString(), y: 0 });
							this.chartDayMonthMai.push({ label: i.toString(), y: 0 });
							this.chartDayMonthJuillet.push({ label: i.toString(), y: 0 });
							this.chartDayMonthAout.push({ label: i.toString(), y: 0 });
							this.chartDayMonthOctobre.push({ label: i.toString(), y: 0 });
							this.chartDayMonthDecembre.push({ label: i.toString(), y: 0 });
						}
						

					}
				}
			}
		} 
		

		this.listeFinal.splice(0, 1);
		this.chartDayMonthFevrier.splice(0, 1);
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
		this.chartDayMonth = [{ label: "1", y: 0 }];
		this.chartDayMonthFevrier = [{ label: "1", y: 0 }];
		this.chartDayMonthMars = [{ label: "1", y: 0 }];
		this.chartDayMonthAvril = [{ label: "1", y: 0 }];
		this.chartDayMonthMai = [{ label: "1", y: 0 }];
		this.chartDayMonthJuin = [{ label: "1", y: 0 }];
		this.chartDayMonthJuillet = [{ label: "1", y: 0 }];
		this.chartDayMonthAout = [{ label: "1", y: 0 }];
		this.chartDayMonthSeptembre = [{ label: "1", y: 0 }];
		this.chartDayMonthOctobre = [{ label: "1", y: 0 }];
		this.chartDayMonthNovembre = [{ label: "1", y: 0 }];
		this.chartDayMonthDecembre = [{ label: "1", y: 0 }];
		const idTemp = e.dataPoint.id + 1;
		this.initChartBeneficeParJour(idTemp.toString());
		this.chart.options = this.visitorsDrilldownedChartOptions;
		this.chart.options.data = this.options[e.dataPoint.name];
		this.chart.options.data.color = "red";
		this.chart.options.title = { text: e.dataPoint.name }

		this.tempNameMonth = e.dataPoint.name;
		this.infoOnClick.id = e.dataPoint.id;
		this.infoOnClick.y = e.dataPoint.y;
		this.infoOnClick.name = e.dataPoint.name;
		this.infoOnClick.color = e.dataPoint.color;
		this.isButtonVisible = true;

		this.chart.render();

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


	initTestChart(): void {
		this.visitorsDrilldownedChartOptions;
		console.log(this.tempNameMonth);
	}

	options: data = {
		"chartMonth": [{
			type: "pie",
			name: "chartMonth",
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
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonth

		}],

		"Fevrier": [{
			color: "#50b432",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthFevrier

		}],
		"Mars": [{
			color: "#752b15",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthMars

		}],
		"Avril": [{
			color: "#FDF5E6",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthAvril

		}],
		"Mai": [{
			color: "#00CED1",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthMai

		}],
		"Juin": [{
			color: "#FF7F50",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthJuin

		}],
		"Juillet": [{
			color: "#FFA07A",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthJuillet

		}],
		"Aout": [{
			color: "#DEB887",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthAout

		}],
		"Septembre": [{
			color: "#9ACD32",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthSeptembre

		}],
		"Octobre": [{
			color: "#00CED1",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthOctobre

		}],
		"Novembre": [{
			color: "#66CDAA",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthNovembre

		}],
		"Decembre": [{
			color: "#B0C4DE",
			name: this.infoOnClick.name,
			type: "column",
			dataPoints:
				this.chartDayMonthDecembre

		}],
	};


	tempNameMonth!: string;

	handleClick(event: Event) {
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options["chartMonth"];
		this.chart.render();
		this.isButtonVisible = false;

	}

	getChartInstance(chart: object) {
		this.chart = chart;
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options["chartMonth"];
		this.chart.render();
	}
}
