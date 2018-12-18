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
	ocorSuspensao: number
	seveSuspensao: number
	deteSuspensao: number
	ocorFreio: number
	seveFreio: number
	deteFreio: number
	ocorEmbreagem: number
	seveEmbreagem: number
	deteEmbreagem: number
	RPNTSuspensao: number
	RPNTFreio: number
	RPNTEmgreagem: number
	KmSuspensao: number 
	KmFreio: number
	KmEmbreagem: number


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
		if(this.linha.totalKmSuspensaoFabrica  && this.linha.totalRPNSuspensaoFabrica ){
				this.isEnablingTable = true
				this.type1 = "Buracos"
				this.type2 = "Redutores"
				this.type3 = "Carga(Kg)" 
				this.RPNTSuspensao =
					(this.ocorSuspensao * this.seveSuspensao * this.deteSuspensao) + 
					(this.ocorFreio * this.seveFreio * this.deteFreio) +
					(this.ocorEmbreagem * this.seveEmbreagem * this.deteEmbreagem)
				this.KmSuspensao = (( this.linha.totalKmSuspensaoFabrica * this.RPNTSuspensao)/this.linha.totalRPNSuspensaoFabrica)
			}else{
				this._toastr.error("Não há Valores de Fábrica para a Suspensão", "Cadastre os valores de fábrica através do menu")
				//this.clearTable()
			}
		}else
		if(this.selecao == "brakes" ){
			if(this.linha.totalKmFreiosFabrica && this.linha.totalRPNFreiosFabrica){
				this.isEnablingTable = true
				this.type1 = "Pontos de parada"
				this.type2 = "Semáforos"
				this.type3 = "Redutores"
				this.RPNTFreio =
					(this.ocorFreio * this.seveFreio * this.deteFreio) + 
					(this.ocorFreio * this.seveFreio * this.deteFreio) +
					(this.ocorFreio * this.seveFreio * this.deteFreio)
				this.KmSuspensao = ((this.linha.totalKmFreiosFabrica * this.RPNTFreio)/this.linha.totalRPNFreiosFabrica)
			}else{
				this._toastr.error("Não há Valores de Fábrica para os Freios", "Cadastre os valores de fábrica através do menu")
				this.clearTable()
			}
		}else
		if(this.selecao == "clutch" ){
			if(this.linha.totalKmEmbreagemFabrica && this.linha.totalRPNEmbreagemFabrica ){
				this.isEnablingTable = true
				this.type1 = "Pontos de Parada"
				this.type2 = "Semáforos"
				this.type3 = "Redutores"
				this.RPNTSuspensao =
					(this.ocorSuspensao * this.seveSuspensao * this.deteSuspensao) + 
					(this.ocorFreio * this.seveFreio * this.deteFreio) +
					(this.ocorEmbreagem * this.seveEmbreagem * this.deteEmbreagem)
				this.KmSuspensao = ((this.linha.totalKmEmbreagemFabrica * this.RPNTEmgreagem)/this.linha.totalRPNEmbreagemFabrica)
			}else{
				this._toastr.error("Não há valores de Fábrica para a Embreagem", "Cadastre os valores de fábrica através do menu")
                this.clearTable()
			}
		}

	}

	clearTable(){
	
		this.isEnablingTable = false
		this.type1 = ""
		this.type2 = ""
		this.type3 = ""
		this.ocorSuspensao = undefined
		this.seveSuspensao = undefined
		this.deteSuspensao =undefined
		this.ocorFreio = undefined
		this.seveFreio = undefined
		this.deteFreio = undefined
		this.ocorEmbreagem = undefined
		this.seveEmbreagem = undefined
		this.deteEmbreagem = undefined
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
		//	this._routerNavigate.navigate(['/view-line']);
		  },
		  error => {
			console.log(error)
			this._toastr.error(error.error, "Houve um erro ao salvar a análise")
			this.isSaving = false
		  }
		)
	}

}