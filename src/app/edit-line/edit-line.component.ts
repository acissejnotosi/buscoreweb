import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
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
    private _fb: FormBuilder,
    private _router: ActivatedRoute) {

    this.createForm()

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

  createForm() {
    this.linhaForm = new FormGroup({
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
  }

  ngOnInit() {

  }

  setForm() {

    this.linhaForm.patchValue({
      linhaId: this.linha.linhaId,
      dataCadastro: this.linha.dataCadastro,
      numeroLinha: this.linha.numeroLinha,
      nomeLinha: this.linha.nomeLinha,
      numParadas: this.linha.numParadas,
      numBuracos: this.linha.numBuracos,
      numLombadas: this.linha.numLombadas,
      numSemaforo: this.linha.numSemaforo,
      totalRPNFreiosFabrica: this.linha.totalRPNFreiosFabrica,
      totalRPNEmbreagemFabrica: this.linha.totalRPNEmbreagemFabrica,
      totalRPNSuspensaoFabrica: this.linha.totalRPNSuspensaoFabrica,
      totalKmFreiosFabrica: this.linha.totalKmFreiosFabrica,
      totalKmEmbreagemFabrica: this.linha.totalKmEmbreagemFabrica,
      totalKmSuspensaoFabrica: this.linha.totalKmSuspensaoFabrica,
      tipoOnibusId: this.linha.tipoOnibusId
    });
    console.log(this.linha)
    console.log(this.linhaForm.value)

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
    this._linhaService.update(this.linhaForm.value).subscribe(
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