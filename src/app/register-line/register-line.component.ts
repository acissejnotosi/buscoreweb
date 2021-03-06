import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LinhaService } from '../services/linha.service'
import { TipoOnibusService } from '../services/tipo-onibus.service'
import { ToastrService } from 'ngx-toastr'
import { ITipoOnibus } from '../models/tipo-onibus.model'

@Component({
	selector: 'app-register-line',
	templateUrl: './register-line.component.html',
	styleUrls: ['./register-line.component.css']
})
export class RegisterLineComponent implements OnInit {

	selectedTipoOnibus: ITipoOnibus
	tiposOnibus: ITipoOnibus[]
	isSubmitting = false

	linhaForm = new FormGroup({
		linhaId: new FormControl(''),
		numeroLinha: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
		nomeLinha: new FormControl('', [Validators.required, Validators.maxLength(255)]),
		totalRPNFreiosFabrica: new FormControl(0),
		totalRPNEmbreagemFabrica: new FormControl(0),
		totalRPNSuspensaoFabrica: new FormControl(0),
		totalKmFreiosFabrica: new FormControl(0),
		totalKmEmbreagemFabrica: new FormControl(0),
		totalKmSuspensaoFabrica: new FormControl(0),
		tipoOnibusId: new FormControl('', [Validators.required])
	})

	constructor(
		private _linhaService: LinhaService,
		private _tipoOnibusService: TipoOnibusService,
		private _toastr: ToastrService) { }

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
		const values = this.linhaForm.value

		if (!values) return

		const onibusId = values.tipoOnibusId

		if (!onibusId) return

		const selectedOnibus = this.tiposOnibus.filter(x => x.id == onibusId)

		if (!selectedOnibus || selectedOnibus.length == 0) return

		this.selectedTipoOnibus = selectedOnibus[0]
	}

	onSubmit() {
		console.log(this.linhaForm.value)
		this.isSubmitting = true
		this._linhaService.saveLinha(this.linhaForm.value).subscribe(
			result => {
				this._toastr.success("Linha criada com sucesso!", "Registro criado")
				this.linhaForm.reset()
				this.isSubmitting = false
			},
			error => {
				console.log(error)
				this._toastr.error(error.error, "Houve um erro ao salvar a linha")
				this.isSubmitting = false
			}
		)
	}
}
