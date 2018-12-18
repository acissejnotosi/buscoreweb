import { Component, OnInit } from '@angular/core'
import { LinhaService } from '../services/linha.service';
import { ILinha } from '../models/linha.model';
import { Router } from '@angular/router';
@Component({
	selector: 'app-rpncalculator',
	templateUrl: './rpncalculator.component.html',
	styleUrls: ['./rpncalculator.component.css']
})
export class RPNCalculatorComponent implements OnInit {

	linhas: ILinha[]
	linha:ILinha
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
	RPNTSuspensaoF: number
	RPNTFreioF: number
	RPNTEmgreagemF: number
	KmSuspensaoF: number 
	KmFreioF: number
	KmEmbreagemF: number

	constructor(private _linhaService: LinhaService, private _router: Router) { }

	ngOnInit() {
		this.getLinhas()
		this.ocorSuspensao = 0
		this.seveSuspensao = 0
		this.deteSuspensao = 0
		this.ocorFreio = 0
		this.seveFreio = 0
		this.deteFreio = 0
		this.ocorEmbreagem = 0
		this.seveEmbreagem = 0
		this.deteEmbreagem = 0
		this.RPNTSuspensaoF = 10 //depois pegar do banco de dados
		this.KmSuspensaoF = 10 //depois pegar do banco de dados
		this.type1 = " "
		this.type2 = " "
		this.type3 = " "
	}


	getLinhas() {

		this._linhaService.getLinhas().subscribe(
			result => {
				this.linhas = result
			},
			error => {
				console.log(error)
			}
		)
	}

	setRPNAndKm(){
        console.log(this.selecao)
		if(this.selecao == "suspension" ){
			this.type1 = "Buracos"
			this.type2 = "Redutores"
			this.type3 = "Carga(Kg)" 
			this.RPNTSuspensao =
				(this.ocorSuspensao * this.seveSuspensao * this.deteSuspensao) + 
				(this.ocorFreio * this.seveFreio * this.deteFreio) +
				(this.ocorEmbreagem * this.seveEmbreagem * this.deteEmbreagem)
			this.KmSuspensao = (( this.KmSuspensaoF * this.RPNTSuspensao)/this.RPNTSuspensaoF)
		}else
		if(this.selecao == "brakes" ){
			this.type1 = "Pontos de parada"
			this.type2 = "Semáforos"
			this.type3 = "Redutores"
			this.RPNTFreio =
				(this.ocorFreio * this.seveFreio * this.deteFreio) + 
				(this.ocorFreio * this.seveFreio * this.deteFreio) +
				(this.ocorFreio * this.seveFreio * this.deteFreio)
			this.KmSuspensao = ((this.KmSuspensaoF * this.RPNTSuspensao)/this.RPNTSuspensaoF)
		}else
		if(this.selecao == "clutch" ){
			this.type1 = "Pontos de Parada"
			this.type2 = "Semáforos"
			this.type3 = "Redutores"
			this.RPNTSuspensao =
				(this.ocorSuspensao * this.seveSuspensao * this.deteSuspensao) + 
				(this.ocorFreio * this.seveFreio * this.deteFreio) +
				(this.ocorEmbreagem * this.seveEmbreagem * this.deteEmbreagem)
			this.KmSuspensao = ((this.KmSuspensaoF * this.RPNTSuspensao)/this.RPNTSuspensaoF)
		}
	}

	editarLinha(linha: ILinha) {
		console.log(linha)
		this._router.navigate(['/edit-line', linha.linhaId]);
	}


}