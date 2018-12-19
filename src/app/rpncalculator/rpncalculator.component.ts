import { Component, OnInit } from '@angular/core'
import { LinhaService } from '../services/linha.service';
import { ILinha } from '../models/linha.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { SuspensaoService } from '../services/suspensao.service';
import { FreioService } from '../services/freio.service';
import { EmbreagemService } from '../services/embreagem.service';
@Component({
	selector: 'app-rpncalculator',
	templateUrl: './rpncalculator.component.html',
	styleUrls: ['./rpncalculator.component.css']
})
export class RPNCalculatorComponent implements OnInit {
	isEnablingComponent: any
	isEnablingTable: any
	isSaving: any
	isRedirecting: any
	suspensaoForm: FormGroup
	freioForm: FormGroup
	embreagemForm: FormGroup
	linhas: ILinha[]
	selectedLinha: any
	linha: ILinha
	type1: string
	type2: string
	type3: string
	selecao: any
	ocorRow1SBuraco: number
	seveRow1SBuraco: number
	deteRow1SBuraco: number
	ocorRow2SRedutor: number
	seveRow2SRedutor: number
	deteRow2SRedutor: number
	ocorRow3SCarga: number
	seveRow3SCarga: number
	deteRow3SCarga: number
	ocorRow1FParada: number
	seveRow1FParada: number
	deteRow1FParada: number
	ocorRow2FSemaforo: number
	seveRow2FSemaforo: number
	deteRow2FSemaforo: number
	ocorRow3FRedutor: number
	seveRow3FRedutor: number
	deteRow3FRedutor: number
	ocorRow1EParada: number
	seveRow1EParada: number
	deteRow1EParada: number
	ocorRow2ESemaforo: number
	seveRow2ESemaforo: number
	deteRow2ESemaforo: number
	ocorRow3ERedutor: number
	seveRow3ERedutor: number
	deteRow3ERedutor: number
	RPNTSuspensao: number
	RPNTFreio: number
	RPNTEmgreagem: number
	KmSuspensao: number
	KmFreio: number
	KmEmbreagem: number
	tableSuspensionEnabled: any
	tableBrakesEnabled: any
	tableClutchEnabled: any
	constructor(
		private _linhaService: LinhaService,
		private _toastr: ToastrService,
		private _router: ActivatedRoute,
		private _routerNavigate: Router,
		private _suspensaoService: SuspensaoService,
		private _freioService: FreioService,
		private _embreagemService: EmbreagemService) { }

	ngOnInit() {
		this.createFormSuspensao()
		this.createFormFreio()
		this.createFormEmbreagem()

		this.isEnablingComponent = false
		this.isEnablingTable = false
		this.getLinhas()
		this.ocorRow1SBuraco = 0
		this.seveRow1SBuraco = 0
		this.deteRow1SBuraco = 0
		this.ocorRow2SRedutor = 0
		this.seveRow2SRedutor = 0
		this.deteRow2SRedutor = 0
		this.ocorRow3SCarga = 0
		this.seveRow3SCarga = 0
		this.deteRow3SCarga = 0
		this.ocorRow1FParada = 0
		this.seveRow1FParada = 0
		this.deteRow1FParada = 0
		this.ocorRow2FSemaforo = 0
		this.seveRow2FSemaforo = 0
		this.deteRow2FSemaforo = 0
		this.ocorRow3FRedutor = 0
		this.seveRow3FRedutor = 0
		this.deteRow3FRedutor = 0
		this.ocorRow1EParada = 0
		this.seveRow1EParada = 0
		this.deteRow1EParada = 0
		this.ocorRow2ESemaforo = 0
		this.seveRow2ESemaforo = 0
		this.deteRow2ESemaforo = 0
		this.ocorRow3ERedutor = 0
		this.seveRow3ERedutor = 0
		this.deteRow3ERedutor = 0
		this.isSaving = false
		this.isRedirecting = false
		this.type1 = " "
		this.type2 = " "
		this.type3 = " "

	}


	getLinhaById(id: number) {

		this._linhaService.getLinhaById(id).subscribe(
			result => {
				this.linha = result
			},

		)

	}

	createFormSuspensao() {
		this.suspensaoForm = new FormGroup({
			RPNSuspensaoCalculado: new FormControl(0),
			RPNBuraco: new FormControl(0),
			RPNRedutor: new FormControl(0),
			RPNCarga: new FormControl(0),
			RPNKmFabrica: new FormControl(0),
			LinhaID: new FormControl('')

		})
	}

	setFormSuspensao() {
		this.suspensaoForm.patchValue({
			RPNSuspensaoCalculado: this.RPNTSuspensao,
			RPNBuraco: this.ocorRow1SBuraco * this.seveRow1SBuraco * this.deteRow1SBuraco,
			RPNRedutor: this.ocorRow2SRedutor * this.seveRow2SRedutor * this.deteRow2SRedutor,
			RPNCarga: this.ocorRow3SCarga * this.seveRow3SCarga * this.deteRow3SCarga,
			RPNKmFabrica: this.KmSuspensao,
			LinhaID: this.linha.linhaId
		})

		console.log(this.suspensaoForm.value)
		this.suspensaoForm.markAsUntouched()
		//this.suspensaoForm.markAsPristine()

	}

	setFormFreio() {
		this.freioForm.patchValue({
			RPNFreioCalculado: this.RPNTFreio,
			RPNPontosParada: this.ocorRow1FParada * this.seveRow1FParada * this.deteRow1FParada,
			RPNSemaforo: this.ocorRow2FSemaforo * this.seveRow2FSemaforo * this.deteRow2FSemaforo,
			RPNRedutores: this.ocorRow3FRedutor * this.seveRow3FRedutor * this.deteRow3FRedutor,
			KmFreioCalculado: this.KmFreio,
			LinhaID: this.linha.linhaId
			//	 dataCadastro : Date.now(),
		})

		console.log(this.freioForm.value)
		this.freioForm.markAsUntouched()
		this.freioForm.markAsPristine()
	}
	createFormFreio() {
		this.freioForm = new FormGroup({
			RPNFreioCalculado: new FormControl(0),
			RPNPontosParada: new FormControl(0),
			RPNSemaforo: new FormControl(0),
			RPNRedutores: new FormControl(0),
			KmFreioCalculado: new FormControl(0),
			LinhaID: new FormControl('')

		})
	}

	setFormEmbreagem() {
		this.embreagemForm.patchValue({
			RPNEmbreagemCalculado: this.RPNTEmgreagem,
			RPNParada: this.ocorRow1EParada * this.seveRow1EParada * this.deteRow1EParada,
			RPNSemaforo: this.ocorRow2ESemaforo * this.seveRow2ESemaforo * this.deteRow2ESemaforo,
			RPNRedutor: this.ocorRow3ERedutor * this.seveRow3ERedutor * this.deteRow3ERedutor,
			KmEmbreagemCalculado: this.KmEmbreagem,
			LinhaID: this.linha.linhaId

		})
		console.log(this.embreagemForm.value)
		this.embreagemForm.markAsUntouched()
		this.embreagemForm.markAsPristine()
	}



	createFormEmbreagem() {
		this.embreagemForm = new FormGroup({
			RPNEmbreagemCalculado: new FormControl(0),
			RPNParada: new FormControl(0),
			RPNSemaforo: new FormControl(0),
			RPNRedutor: new FormControl(0),
			KmEmbreagemCalculado: new FormControl(0),
			LinhaID: new FormControl('')

		})
	}


	getLinhas() {

		this._linhaService.getLinhas().subscribe(
			result => {
				this.linhas = result
				this.isEnablingComponent = true
			},
			error => {
				this.isEnablingComponent = false
				console.log(error)
			}
		)
	}

	SetEnablingTable() {

		this.isEnablingTable = true
		this.getLinhaById(this.selectedLinha)
	}

	setRPNAndKmSuspensao() {
		console.log(this.linha)
		console.log(this.linha.totalKmSuspensaoFabrica)
		console.log(this.linha.totalRPNSuspensaoFabrica)

		if (this.linha.totalKmSuspensaoFabrica && this.linha.totalRPNSuspensaoFabrica) {
			this.isEnablingTable = true

			this.RPNTSuspensao =
				((this.ocorRow1SBuraco * this.seveRow1SBuraco * this.deteRow1SBuraco) +
					(this.ocorRow2SRedutor * this.seveRow2SRedutor * this.deteRow2SRedutor) +
					(this.ocorRow3SCarga * this.seveRow3SCarga * this.deteRow3SCarga))
			this.KmSuspensao = ((1 * this.RPNTSuspensao) / 1)



		} else {
			this._toastr.error("Valores de Fábrica para a Suspensão incompletos", "Cadastre os valores de fábrica através do menu")
			this.clearTableSuspensao()
		}

	}

	setRPNAndKmFreio() {

		if (this.linha.totalKmFreiosFabrica && this.linha.totalRPNFreiosFabrica) {
			this.isEnablingTable = true

			this.RPNTFreio =
				((this.ocorRow1FParada * this.seveRow1FParada * this.deteRow1FParada) +
					(this.ocorRow2FSemaforo * this.seveRow2FSemaforo * this.deteRow2FSemaforo) +
					(this.ocorRow3FRedutor * this.seveRow3FRedutor * this.deteRow3FRedutor))
			this.KmFreio = ((1 * this.RPNTFreio) / 1)
		} else {
			this._toastr.error("Valores de Fábrica para os Freios incompletos", "Cadastre os valores de fábrica através do menu")
			this.clearTableFreios()
		}

	}

	setRPNAndKmEmbreagem() {



		console.log("entrou na embreagem")
		if (this.linha.totalKmEmbreagemFabrica && this.linha.totalRPNEmbreagemFabrica) {
			this.isEnablingTable = true

			this.RPNTEmgreagem =
				((this.ocorRow1EParada * this.seveRow1EParada * this.deteRow1EParada) +
					(this.ocorRow2ESemaforo * this.seveRow2ESemaforo * this.deteRow2ESemaforo) +
					(this.ocorRow3ERedutor * this.seveRow3ERedutor * this.deteRow3ERedutor))
			this.KmEmbreagem = ((1 * this.RPNTEmgreagem) / 1)
		} else {
			this._toastr.error("Valores de Fábrica para a Embreagem incompletos", "Cadastre os valores de fábrica através do menu")
			this.clearTableEmbreagem()
		}

	}



	clearTableSuspensao() {

		//	this.isEnablingTable = true
		this.ocorRow1SBuraco = undefined
		this.seveRow1SBuraco = undefined
		this.deteRow1SBuraco = undefined
		this.ocorRow2SRedutor = undefined
		this.seveRow2SRedutor = undefined
		this.deteRow2SRedutor = undefined
		this.ocorRow3SCarga = undefined
		this.seveRow3SCarga = undefined
		this.deteRow3SCarga = undefined
		this.RPNTSuspensao = undefined
		this.KmSuspensao = undefined

	}

	clearTableEmbreagem() {
		this.ocorRow1EParada = undefined
		this.seveRow1EParada = undefined
		this.deteRow1EParada = undefined
		this.ocorRow2ESemaforo = undefined
		this.seveRow2ESemaforo = undefined
		this.deteRow2ESemaforo = undefined
		this.ocorRow3ERedutor = undefined
		this.seveRow3ERedutor = undefined
		this.deteRow3ERedutor = undefined
		this.RPNTEmgreagem = undefined
		this.KmEmbreagem = undefined


	}

	clearTableFreios() {

		this.ocorRow1FParada = undefined
		this.seveRow1FParada = undefined
		this.deteRow1FParada = undefined
		this.ocorRow2FSemaforo = undefined
		this.seveRow2FSemaforo = undefined
		this.deteRow2FSemaforo = undefined
		this.ocorRow3FRedutor = undefined
		this.seveRow3FRedutor = undefined
		this.deteRow3FRedutor = undefined
		this.RPNTFreio = undefined
		this.KmFreio = undefined

	}

	verificarSeEstaDentroDoRange(valor: number) {

		if (valor < 1 || valor > 10) {
			this._toastr.info("Insira valores entre 1 - 10", "Entrada não aceita")
			this.isSaving = false

		}


	}

	salvarAnalise() {

		this.setFormEmbreagem()
		this.setFormFreio()
		this.setFormSuspensao()

		this._suspensaoService.saveSuspensao(this.suspensaoForm.value).subscribe(
			result => {
				this._toastr.success("Valores de Suspensão salvos com sucesso!", "Novos valores salvos na base de dados")
				this.isSaving = false
				this.isRedirecting = true
			},
			error => {
				console.log(error)
				this._toastr.error(error.error, "Houve um erro ao salvar a análise")
				this.isSaving = false
			}
		)

		console.log(this.freioForm.value)
		this._freioService.saveFreio(this.freioForm.value).subscribe(
			result => {
				this._toastr.success("Valores de Freio salvos com sucesso!", "Novos valores salvos na base de dados")
				this.isSaving = false
				this.isRedirecting = true
			},
			error => {
				console.log(error)
				this._toastr.error(error.error, "Houve um erro ao salvar a análise")
				this.isSaving = false
			}
		)


		this._embreagemService.saveEmbreagem(this.embreagemForm.value).subscribe(
			result => {
				this._toastr.success("Valores de Embreagem salvos com sucesso!", "Novos valores salvos na base de dados")
				this.isSaving = false
				this.isRedirecting = true
			},
			error => {
				console.log(error)
				this._toastr.error(error.error, "Houve um erro ao salvar a análise")
				this.isSaving = false
			}
		)
	}

	setLocalStorage() {
		// Check browser support
		if (typeof (Storage) !== "undefined") {
			// Store
			console.log("entrou")

			//Suspensao
			localStorage.setItem("ocorSuspensaor1", JSON.stringify(this.ocorRow1SBuraco));
			localStorage.setItem("seveSuspensaor1", JSON.stringify(this.seveRow1SBuraco));
			localStorage.setItem("deteSuspensaor1", JSON.stringify(this.deteRow1SBuraco));
			localStorage.setItem("ocorSuspensaor2", JSON.stringify(this.ocorRow2SRedutor));
			localStorage.setItem("seveSuspensaor2", JSON.stringify(this.seveRow2SRedutor));
			localStorage.setItem("deteSuspensaor2", JSON.stringify(this.deteRow2SRedutor));
			localStorage.setItem("ocorSuspensaor3", JSON.stringify(this.ocorRow3SCarga));
			localStorage.setItem("seveSuspensaor3", JSON.stringify(this.seveRow3SCarga));
			localStorage.setItem("deteSuspensaor3", JSON.stringify(this.deteRow3SCarga));
			//Freio
			localStorage.setItem("ocorFreior1", JSON.stringify(this.ocorRow1FParada));
			localStorage.setItem("seveFreior1", JSON.stringify(this.seveRow1FParada));
			localStorage.setItem("deteFreior1", JSON.stringify(this.deteRow1FParada));
			localStorage.setItem("ocorFreior2", JSON.stringify(this.ocorRow2FSemaforo));
			localStorage.setItem("seveFreior2", JSON.stringify(this.seveRow2FSemaforo));
			localStorage.setItem("deteFreior2", JSON.stringify(this.deteRow2FSemaforo));
			localStorage.setItem("ocorFreior3", JSON.stringify(this.ocorRow3FRedutor));
			localStorage.setItem("seveFreior3", JSON.stringify(this.seveRow3FRedutor));
			localStorage.setItem("deteFreior3", JSON.stringify(this.deteRow3FRedutor));
			//Embreagem
			localStorage.setItem("ocorEmbreagemr1", JSON.stringify(this.ocorRow1EParada));
			localStorage.setItem("seveEmbreagemr1", JSON.stringify(this.seveRow1EParada));
			localStorage.setItem("deteEmbreagemr1", JSON.stringify(this.deteRow1EParada));
			localStorage.setItem("ocorEmbreagemr2", JSON.stringify(this.ocorRow2ESemaforo));
			localStorage.setItem("seveEmbreagemr2", JSON.stringify(this.seveRow2ESemaforo));
			localStorage.setItem("deteEmbreagemr2", JSON.stringify(this.deteRow2ESemaforo));
			localStorage.setItem("ocorEmbreagemr3", JSON.stringify(this.ocorRow3ERedutor));
			localStorage.setItem("seveEmbreagemr3", JSON.stringify(this.seveRow3ERedutor));
			localStorage.setItem("deteEmbreagemr3", JSON.stringify(this.deteRow3ERedutor));

			localStorage.setItem("linhaId", JSON.stringify(this.linha.linhaId));
			// Retrieve
			//	document.getElementById("result").innerHTML = localStorage.getItem("lastname");
		} else {
			document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
		}
	}

	tableSuspensao() {

		if (this.selecao == "suspension") {
			this.tableSuspensionEnabled = true
			this.tableClutchEnabled = false
			this.tableBrakesEnabled = false
		} else if (this.selecao == "brakes") {
			this.tableSuspensionEnabled = false
			this.tableClutchEnabled = false
			this.tableBrakesEnabled = true
		}
		else if (this.selecao == "clutch") {
			this.tableSuspensionEnabled = false
			this.tableClutchEnabled = true
			this.tableBrakesEnabled = false

		}

	}

	redirecionarParaGerarRelatorio() {
		this.setLocalStorage()
		this._routerNavigate.navigate(['/reportResult']);
	}


}