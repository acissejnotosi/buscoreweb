import { Component, OnInit } from '@angular/core'
import { LinhaService } from '../services/linha.service';
import { ILinha } from '../models/linha.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-rpncalculator',
	templateUrl: './rpncalculator.component.html',
	styleUrls: ['./rpncalculator.component.css']
})
export class RPNCalculatorComponent implements OnInit {
	isEnablingComponent : any
	isEnablingTable: any
	isSaving: any
	isRedireting: any
	linhas: ILinha[]
	selectedLinha:any
	linha: ILinha
	type1: string
	type2: string
	type3: string
	selecao: any
	ocorRow1: number
	seveRow1: number
	deteRow1: number
	ocorRow2: number
	seveRow2: number
	deteRow2: number
	ocorRow3: number
	seveRow3: number
	deteRow3: number
	RPNTSuspensao: number
	RPNTFreio: number
	RPNTEmgreagem: number
	KmSuspensao: number 
	KmFreio: number
	KmEmbreagem: number
	tableSuspensionEnabled :  any
	tableBrakesEnabled : any
	tableClutchEnabled : any
	constructor(private _linhaService: LinhaService,  private _toastr: ToastrService, private _router: Router) { }

	ngOnInit() {
		this.isEnablingComponent = false
		this.isEnablingTable = false
		this.getLinhas()
		
		this.isSaving = false
		this.isRedireting = false
		this.type1 = " "
		this.type2 = " "
		this.type3 = " "
	
	}


	getLinhaById(id : number){

		this._linhaService.getLinhaById(id).subscribe(
			result => {
				this.linha = result
			  },

		)

	}

	getLinhas() {

		this._linhaService.getLinhas().subscribe(
			result => {
				this.linhas = result
				this.isEnablingComponent = true
			},
			error => {
				this.isEnablingComponent  =false
				console.log(error)
			}
		)
	}

	setRPNAndKm(){


		
		this.getLinhaById(this.selectedLinha)
		
		if(this.selecao == "suspension"){
		//if(this.linha.totalKmSuspensaoFabrica  && this.linha.totalRPNSuspensaoFabrica ){
				this.isEnablingTable = true
				this.type1 = "Buracos"
				this.type2 = "Redutores"
				this.type3 = "Carga(Kg)" 
				this.RPNTSuspensao =
					((this.ocorRow1 * this.seveRow1 * this.deteRow1) + 
					(this.ocorRow2 * this.seveRow2 * this.deteRow2) +
					(this.ocorRow3 * this.seveRow3 * this.deteRow3))
				this.KmSuspensao = (( this.linha.totalKmSuspensaoFabrica * this.RPNTSuspensao)/this.linha.totalRPNSuspensaoFabrica)
			//}else{
			//	this._toastr.error("Não há Valores de Fábrica para a Suspensão", "Cadastre os valores de fábrica através do menu")
			//	this.clearTable()
			//}
		}else
		if(this.selecao == "brakes" ){
			//if(this.linha.totalKmFreiosFabrica && this.linha.totalRPNFreiosFabrica){
				this.isEnablingTable = true
				this.type1 = "Pontos de parada"
				this.type2 = "Semáforos"
				this.type3 = "Redutores"
				this.RPNTFreio =
				((this.ocorRow1 * this.seveRow1 * this.deteRow1) + 
				(this.ocorRow2 * this.seveRow2 * this.deteRow2) +
				(this.ocorRow3 * this.seveRow3 * this.deteRow3))
				this.KmSuspensao = ((this.linha.totalKmFreiosFabrica * this.RPNTFreio)/this.linha.totalRPNFreiosFabrica)
			//}else{
			//	this._toastr.error("Não há Valores de Fábrica para os Freios", "Cadastre os valores de fábrica através do menu")
			//	this.clearTable()
			//}
		}else
		if(this.selecao == "clutch" ){

			console.log("entrou na embreagem")
			//if(this.linha.totalKmEmbreagemFabrica && this.linha.totalRPNEmbreagemFabrica ){
				this.isEnablingTable = true
				this.type1 = "Pontos de Parada"
				this.type2 = "Semáforos"
				this.type3 = "Redutores"
				this.RPNTEmgreagem =
				((this.ocorRow1 * this.seveRow1 * this.deteRow1) + 
				(this.ocorRow2 * this.seveRow2 * this.deteRow2) +
				(this.ocorRow3 * this.seveRow3 * this.deteRow3))
				this.KmEmbreagem = ((this.linha.totalKmEmbreagemFabrica * this.RPNTEmgreagem)/this.linha.totalRPNEmbreagemFabrica)
			//}else{
			//	this._toastr.error("Não há valores de Fábrica para a Embreagem", "Cadastre os valores de fábrica através do menu")
            //    this.clearTable()
			//}
		}

	}

	clearTable(){
	
		this.isEnablingTable = true
		this.type1 = ""
		this.type2 = ""
		this.type3 = ""
		this.ocorRow1 = undefined
		this.seveRow1 = undefined
		this.deteRow1 =undefined
		this.ocorRow2 = undefined
		this.seveRow2 = undefined
		this.deteRow2 = undefined
		this.ocorRow3 = undefined
		this.seveRow3 = undefined
		this.deteRow3 = undefined
		this.RPNTSuspensao= undefined
		this.RPNTFreio= undefined
		this.RPNTEmgreagem= undefined
		this.KmSuspensao= undefined 
		this.KmFreio= undefined
		this.KmEmbreagem= undefined

	}

	verificarSeEstaDentroDoRange(valor : number){

		if(valor <1 || valor>10)
		{
			this._toastr.info("Insira valores entre 1 - 10", "Entrada não aceita")
			this.isSaving = false

		}


	}

	editarLinha(linha: ILinha) {
		console.log(linha)
		this._router.navigate(['/edit-line', linha.linhaId]);
	}

	salvarAnalise() {
		this.isSaving = true
		this._linhaService.update(this.linha).subscribe(
		  result => {
			this._toastr.success("Valores Calculados para essa linha salvos com sucesso!", "Novos valores salvos na base de dados")
			this.isSaving = false
			this.setLocalStorage()
		//	this._routerNavigate.navigate(['/view-line']);
		  },
		  error => {
			console.log(error)
			this._toastr.error(error.error, "Houve um erro ao salvar a análise")
			this.isSaving = false
		  }
		)
	}

	setLocalStorage(){
		// Check browser support
		if (typeof(Storage) !== "undefined") {
			// Store
			console.log("entrou")

			localStorage.setItem("ocorSuspensao", JSON.stringify(this.ocorRow1));
			localStorage.setItem("seveSuspensao", JSON.stringify(this.seveRow1));
			localStorage.setItem("deteSuspensao", JSON.stringify(this.deteRow1));
			localStorage.setItem("ocorFreio",JSON.stringify(this.ocorRow2));
			localStorage.setItem("seveFreio", JSON.stringify(this.seveRow2));
			localStorage.setItem("deteFreio",JSON.stringify(this.deteRow2));
			localStorage.setItem("ocorEmbreagem", JSON.stringify(this.ocorRow3));
			localStorage.setItem("seveEmbreagem",JSON.stringify(this.seveRow3));
			localStorage.setItem("deteEmbreagem", JSON.stringify(this.deteRow3));

			// Retrieve
		//	document.getElementById("result").innerHTML = localStorage.getItem("lastname");
		} else {
			document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
		}
	}

	tableSuspensao(){

		if (this.selecao == "suspension"){
			this.tableSuspensionEnabled = true
			this.tableClutchEnabled = false
			this.tableBrakesEnabled = false
		}else if (this.selecao == "brakes"){
			this.tableSuspensionEnabled = false
			this.tableClutchEnabled = false
			this.tableBrakesEnabled = true
		}
		else if (this.selecao == "clutch"){
			this.tableSuspensionEnabled = false
			this.tableClutchEnabled = true
			this.tableBrakesEnabled = false

		}
	
	}
}