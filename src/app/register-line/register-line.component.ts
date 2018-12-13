import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LinhaService } from '../services/linha.service'
import { TipoOnibusService } from '../services/tipo-onibus.service'
import { ITipoOnibus } from '../models/tipo-onibus.model'

@Component({
	selector: 'app-register-line',
	templateUrl: './register-line.component.html',
	styleUrls: ['./register-line.component.css']
})
export class RegisterLineComponent implements OnInit {

	selectedTipoOnibus: ITipoOnibus
	tiposOnibus: ITipoOnibus[]

	linhaForm = new FormGroup({
		linhaId: new FormControl(''),
		dataCadastro: new FormControl(''),
		numeroLinha: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
		nomeLinha: new FormControl('', [Validators.required, Validators.maxLength(255)]),
		numParadas: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
		numBuracos: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
		numLombadas: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
		numSemaforo: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
		totalRPNFreiosFabrica: new FormControl(''),
		totalRPNEmbreagemFabrica: new FormControl(''),
		totalRPNSuspensaoFabrica: new FormControl(''),
		totalKmFreiosFabrica: new FormControl(''),
		totalKmEmbreagemFabrica: new FormControl(''),
		totalKmSuspensaoFabrica: new FormControl(''),
		tipoOnibusId: new FormControl('', [Validators.required])
	})

	constructor(
		private _linhaService: LinhaService,
		private _tipoOnibusService: TipoOnibusService) { }

	ngOnInit() {
		this._tipoOnibusService.getTipoOnibus().subscribe(
			result => {
				this.tiposOnibus = result
			},
			error => {
				console.log(error)
			}
		)
	}

	onChange() {
		let values = this.linhaForm.value

		if (!values) return

		let onibusId = values.tipoOnibusId

		if (!onibusId) return

		let selectedOnibus = this.tiposOnibus.filter(x => x.id == onibusId)

		if (!selectedOnibus || selectedOnibus.length == 0) return

		this.selectedTipoOnibus = selectedOnibus[0]
	}

	onSubmit() {
		console.warn(this.linhaForm.value)
	}
}
