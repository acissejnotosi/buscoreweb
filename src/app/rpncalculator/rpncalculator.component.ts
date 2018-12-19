import { Component, OnInit } from '@angular/core'
import { LinhaService } from '../services/linha.service';
import { ILinha } from '../models/linha.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
	ocorRow1S: number
	seveRow1S: number
	deteRow1S: number
	ocorRow2S: number
	seveRow2S: number
	deteRow2S: number
	ocorRow3S: number
	seveRow3S: number
	deteRow3S: number
	ocorRow1F: number
	seveRow1F: number
	deteRow1F: number
	ocorRow2F: number
	seveRow2F: number
	deteRow2F: number
	ocorRow3F: number
	seveRow3F: number
	deteRow3F: number
	ocorRow1E: number
	seveRow1E: number
	deteRow1E: number
	ocorRow2E: number
	seveRow2E: number
	deteRow2E: number
	ocorRow3E: number
	seveRow3E: number
	deteRow3E: number
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
		this.ocorRow1S =0
		this.seveRow1S =  0
		this.deteRow1S = 0
		this.ocorRow2S= 0
		this.seveRow2S= 0
		this.deteRow2S= 0
		this.ocorRow3S= 0
		this.seveRow3S= 0
		this.deteRow3S= 0
		this.ocorRow1F= 0
		this.seveRow1F= 0
		this.deteRow1F= 0
		this.ocorRow2F= 0
		this.seveRow2F= 0
		this.deteRow2F= 0
		this.ocorRow3F= 0
		this.seveRow3F= 0
		this.deteRow3F= 0
		this.ocorRow1E= 0
		this.seveRow1E= 0
		this.deteRow1E= 0
		this.ocorRow2E= 0
		this.seveRow2E= 0
		this.deteRow2E= 0
		this.ocorRow3E= 0
		this.seveRow3E= 0
		this.deteRow3E= 0
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

	SetEnablingTable(){

		this.isEnablingTable = true
		this.getLinhaById(this.selectedLinha)
	}

	setRPNAndKmSuspensao(){
		console.log(this.linha)
		console.log(this.linha.totalKmSuspensaoFabrica)
		console.log( this.linha.totalRPNSuspensaoFabrica)
	
		if(this.linha.totalKmSuspensaoFabrica  && this.linha.totalRPNSuspensaoFabrica ){
				this.isEnablingTable = true
				this.type1 = "Buracos"
				this.type2 = "Redutores"
				this.type3 = "Carga(Kg)" 
				this.RPNTSuspensao =
					((this.ocorRow1S * this.seveRow1S * this.deteRow1S) + 
					(this.ocorRow2S * this.seveRow2S * this.deteRow2S) +
					(this.ocorRow3S * this.seveRow3S * this.deteRow3S))
				this.KmSuspensao = (( 1* this.RPNTSuspensao)/1)

			

			}else{
				this._toastr.error("Não há Valores de Fábrica para a Suspensão", "Cadastre os valores de fábrica através do menu")
				this.clearTable()
			}
	
	}
	
	setRPNAndKmFreio(){
	
			if(this.linha.totalKmFreiosFabrica && this.linha.totalRPNFreiosFabrica){
				this.isEnablingTable = true
				this.type1 = "Pontos de parada"
				this.type2 = "Semáforos"
				this.type3 = "Redutores"
				this.RPNTFreio =
				((this.ocorRow1F * this.seveRow1F * this.deteRow1F) + 
				(this.ocorRow2F * this.seveRow2F * this.deteRow2F) +
				(this.ocorRow3F * this.seveRow3F * this.deteRow3F))
				this.KmSuspensao = ((1 * this.RPNTFreio)/1)
			}else{
				this._toastr.error("Não há Valores de Fábrica para os Freios", "Cadastre os valores de fábrica através do menu")
				this.clearTable()
			}
		
	}

	setRPNAndKmEmbreagem(){
	

		
			console.log("entrou na embreagem")
			if(this.linha.totalKmEmbreagemFabrica && this.linha.totalRPNEmbreagemFabrica ){
				this.isEnablingTable = true
				this.type1 = "Pontos de Parada"
				this.type2 = "Semáforos"
				this.type3 = "Redutores"
				this.RPNTEmgreagem =
				((this.ocorRow1E * this.seveRow1E * this.deteRow1E) + 
				(this.ocorRow2E * this.seveRow2E * this.deteRow2E) +
				(this.ocorRow3E * this.seveRow3E * this.deteRow3E))
				this.KmEmbreagem = ((1 * this.RPNTEmgreagem)/1)
			}else{
				this._toastr.error("Não há valores de Fábrica para a Embreagem", "Cadastre os valores de fábrica através do menu")
               this.clearTable()
			}
		
	}

	

	clearTable(){
	
		this.isEnablingTable = true
		this.type1 = ""
		this.type2 = ""
		this.type3 = ""
		this.ocorRow1S = undefined
		this.seveRow1S = undefined
		this.deteRow1S =undefined
		this.ocorRow2S = undefined
		this.seveRow2S = undefined
		this.deteRow2S = undefined
		this.ocorRow3S = undefined
		this.seveRow3S = undefined
		this.deteRow3S = undefined
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
	
		console.log(this.linha)
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

			//Suspensao
			localStorage.setItem("ocorSuspensaor1", JSON.stringify(this.ocorRow1S));
			localStorage.setItem("seveSuspensaor1", JSON.stringify(this.seveRow1S));
			localStorage.setItem("deteSuspensaor1", JSON.stringify(this.deteRow1S));
			localStorage.setItem("ocorSuspensaor2",JSON.stringify(this.ocorRow2S));
			localStorage.setItem("seveSuspensaor2", JSON.stringify(this.seveRow2S));
			localStorage.setItem("deteSuspensaor2",JSON.stringify(this.deteRow2S));
			localStorage.setItem("ocorSuspensaor3", JSON.stringify(this.ocorRow3S));
			localStorage.setItem("seveSuspensaor3",JSON.stringify(this.seveRow3S));
			localStorage.setItem("deteSuspensaor3", JSON.stringify(this.deteRow3S));
			//Freio
			localStorage.setItem("ocorFreior1", JSON.stringify(this.ocorRow1F));
			localStorage.setItem("seveFreior1", JSON.stringify(this.seveRow1F));
			localStorage.setItem("deteFreior1", JSON.stringify(this.deteRow1F));
			localStorage.setItem("ocorFreior2",JSON.stringify(this.ocorRow2F));
			localStorage.setItem("seveFreior2", JSON.stringify(this.seveRow2F));
			localStorage.setItem("deteFreior2",JSON.stringify(this.deteRow2F));
			localStorage.setItem("ocorFreior3", JSON.stringify(this.ocorRow3F));
			localStorage.setItem("seveFreior3",JSON.stringify(this.seveRow3F));
			localStorage.setItem("deteFreior3", JSON.stringify(this.deteRow3F));
			//Embreagem
			localStorage.setItem("ocorEmbreagemr1", JSON.stringify(this.ocorRow1E));
			localStorage.setItem("seveEmbreagemr1", JSON.stringify(this.seveRow1E));
			localStorage.setItem("deteEmbreagemr1", JSON.stringify(this.deteRow1E));
			localStorage.setItem("ocorEmbreagemr2",JSON.stringify(this.ocorRow2E));
			localStorage.setItem("seveEmbreagemr2", JSON.stringify(this.seveRow2E));
			localStorage.setItem("deteEmbreagemr2",JSON.stringify(this.deteRow2E));
			localStorage.setItem("ocorEmbreagemr3", JSON.stringify(this.ocorRow3E));
			localStorage.setItem("seveEmbreagemr3",JSON.stringify(this.seveRow3E));
			localStorage.setItem("deteEmbreagemr3", JSON.stringify(this.deteRow3E));

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