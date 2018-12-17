import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LinhaService } from '../services/linha.service'
import { TipoOnibusService } from '../services/tipo-onibus.service'
import { ToastrService } from 'ngx-toastr'
import { ITipoOnibus } from '../models/tipo-onibus.model'
import { ActivatedRoute } from '@angular/router';
import { ILinha } from '../models/linha.model';

@Component({
  selector: 'app-edit-line',
  templateUrl: './edit-line.component.html',
  styleUrls: ['./edit-line.component.css']
})
export class EditLineComponent implements OnInit {

  selectedTipoOnibus: ITipoOnibus
  tiposOnibus: ITipoOnibus[]
  isSubmitting = false
  linha: ILinha

  linhaForm: FormGroup

  constructor(
    private _linhaService: LinhaService,
    private _tipoOnibusService: TipoOnibusService,
    private _toastr: ToastrService,
    private _router: ActivatedRoute) {

    this._router.params.subscribe(
      params => {
        const id = params['id']

        this._tipoOnibusService.getTipoOnibus().subscribe(
          result => {
            this.tiposOnibus = result
          },
          error => {
            this._toastr.error("Ocorreu um erro ao carregar os tipos de onibus.", "Erro")
          }
        )

        this._linhaService.getLinhaById(id).subscribe(
          result => {
            this.linha = result

            this.setForm()
          },
          error => {
            this._toastr.error("Ocorreu um erro ao editar a linha.", "Erro")
          }
        )
      }
    )
  }

  ngOnInit() {

  }

  setForm() {
    this.linhaForm = new FormGroup({
      linhaId: new FormControl(this.linha.linhaId),
      dataCadastro: new FormControl(this.linha.dataCadastro),
      numeroLinha: new FormControl(this.linha.numeroLinha, [Validators.required, Validators.min(1), Validators.max(99999)]),
      nomeLinha: new FormControl(this.linha.nomeLinha, [Validators.required, Validators.maxLength(255)]),
      numParadas: new FormControl(this.linha.numParadas, [Validators.required, Validators.min(1), Validators.max(99999)]),
      numBuracos: new FormControl(this.linha.numBuracos, [Validators.required, Validators.min(1), Validators.max(99999)]),
      numLombadas: new FormControl(this.linha.numLombadas, [Validators.required, Validators.min(1), Validators.max(99999)]),
      numSemaforo: new FormControl(this.linha.numSemaforo, [Validators.required, Validators.min(1), Validators.max(99999)]),
      totalRPNFreiosFabrica: new FormControl(this.linha.totalRPNFreiosFabrica),
      totalRPNEmbreagemFabrica: new FormControl(this.linha.totalRPNEmbreagemFabrica),
      totalRPNSuspensaoFabrica: new FormControl(this.linha.totalRPNSuspensaoFabrica),
      totalKmFreiosFabrica: new FormControl(this.linha.totalKmFreiosFabrica),
      totalKmEmbreagemFabrica: new FormControl(this.linha.totalKmEmbreagemFabrica),
      totalKmSuspensaoFabrica: new FormControl(this.linha.totalKmSuspensaoFabrica),
      tipoOnibusId: new FormControl(this.linha.tipoOnibusId, [Validators.required])
    })

    this.linhaForm.markAsUntouched()
    this.linhaForm.markAsPristine()
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
    this.isSubmitting = true
    this._linhaService.saveLinha(this.linhaForm.value).subscribe(
      result => {
        this._toastr.success("Linha atualizada com sucesso!", "Registro atualizado")
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