import { Component, OnInit } from '@angular/core';
import { LinhaService } from '../services/linha.service';
import { ILinha } from '../models/linha.model';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-factory-value',
  templateUrl: './factory-value.component.html',
  styleUrls: ['./factory-value.component.css']
})
export class FactoryValueComponent implements OnInit {

  linhas: ILinha[]
  linha: ILinha
  linhaSelecionada: number

  suspensaoBuracoCalc: number = 0
  suspensaoRedutorCalc: number = 0
  suspensaoCargaCalc: number = 0
  suspensaoKmCalc: number = 0

  embreagemParadaCalc: number = 0
  embreagemSemaforoCalc: number = 0
  embreagemRedutorCalc: number = 0
  embreagemKmCalc: number = 0

  freiosParadaCalc: number = 0
  freiosSemaforoCalc: number = 0
  freiosRedutorCalc: number = 0
  freiosKmCalc: number = 0

  rpnTotalEmbreagem: number = 0 
  rpnTotalFreio: number = 0
  rpnTotalSuspensao: number =0

  isSubmitting: boolean = false

  linhaFabricaForm = new FormGroup({
    linhaId: new FormControl(0),
    numeroLinha: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    nomeLinha: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    tipoOnibusId: new FormControl(0, [Validators.required]),
    RPNSuspensaoBuracoFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    RPNSuspensaoRedutorFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    RPNSuspensaoCargaFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalKmSuspensaoFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalRPNFreiosFabrica: new FormControl(0),
    RPNEmbreagemParadaFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    RPNEmbreagemSemaforoFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    RPNEmbreagemRedutorFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalKmEmbreagemFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalRPNEmbreagemFabrica: new FormControl(0),
    RPNFreioParadaFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    RPNFreioSemaforoFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    RPNFreioRedutorFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalKmFreiosFabrica: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalRPNSuspensaoFabrica: new FormControl(0)
  })

  constructor(
    private _linhaService: LinhaService,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    this._linhaService.getLinhas().subscribe(
      result => {
        this.linhas = result
        console.log(result)
        this.setForm()
      },
      error => {
        this._toastrService.error(error.error, "Erro ao carregar as linhas")
      }
    )
  }

  updateCalculation() {
    console.log(this.linhaFabricaForm.value)
    this.suspensaoBuracoCalc = this.linhaFabricaForm.get('RPNSuspensaoBuracoFabrica').value
    this.suspensaoRedutorCalc = this.linhaFabricaForm.get('RPNSuspensaoRedutorFabrica').value
    this.suspensaoCargaCalc = this.linhaFabricaForm.get('RPNSuspensaoCargaFabrica').value
    this.suspensaoKmCalc = this.linhaFabricaForm.get('totalKmSuspensaoFabrica').value

    this.embreagemParadaCalc = this.linhaFabricaForm.get('RPNEmbreagemParadaFabrica').value
    this.embreagemSemaforoCalc = this.linhaFabricaForm.get('RPNEmbreagemSemaforoFabrica').value
    this.embreagemRedutorCalc = this.linhaFabricaForm.get('RPNEmbreagemRedutorFabrica').value
    this.embreagemKmCalc = this.linhaFabricaForm.get('totalKmEmbreagemFabrica').value

    this.freiosParadaCalc = this.linhaFabricaForm.get('RPNFreioParadaFabrica').value
    this.freiosSemaforoCalc = this.linhaFabricaForm.get('RPNFreioSemaforoFabrica').value
    this.freiosRedutorCalc = this.linhaFabricaForm.get('RPNFreioRedutorFabrica').value
    this.freiosKmCalc = this.linhaFabricaForm.get('totalKmFreiosFabrica').value
  
  }

  setLinha(){
    const linhaFiltro = this.linhas.filter(x => x.linhaId == this.linhaFabricaForm.get('linhaId').value)
    if(!linhaFiltro || linhaFiltro.length == 0) return
    this.linha = linhaFiltro[0]
    this.setForm()
    this.updateCalculation()
  }

  clearCalculations(){
    this.suspensaoBuracoCalc = 0
    this.suspensaoRedutorCalc = 0
    this.suspensaoCargaCalc = 0
    this.suspensaoKmCalc = 0

    this.embreagemParadaCalc = 0
    this.embreagemSemaforoCalc = 0
    this.embreagemRedutorCalc = 0
    this.embreagemKmCalc = 0

    this.freiosParadaCalc = 0
    this.freiosSemaforoCalc = 0
    this.freiosRedutorCalc = 0
    this.freiosKmCalc = 0
  }

  setForm() {

    if(!this.linha) return

    console.log(this.linha)
    this.linhaFabricaForm.patchValue({
      linhaId: this.linha.linhaId,
      numeroLinha: this.linha.numeroLinha,
      nomeLinha: this.linha.nomeLinha,
      tipoOnibusId: this.linha.tipoOnibusId,
      RPNSuspensaoBuracoFabrica: this.linha.rpnSuspensaoBuracoFabrica,
      RPNSuspensaoRedutorFabrica: this.linha.rpnSuspensaoRedutorFabrica,
      RPNSuspensaoCargaFabrica: this.linha.rpnSuspensaoCargaFabrica,
      totalKmSuspensaoFabrica: this.linha.totalKmSuspensaoFabrica,
      RPNEmbreagemParadaFabrica: this.linha.rpnEmbreagemParadaFabrica,
      RPNEmbreagemSemaforoFabrica: this.linha.rpnEmbreagemSemaforoFabrica,
      RPNEmbreagemRedutorFabrica: this.linha.rpnEmbreagemRedutorFabrica,
      totalKmEmbreagemFabrica: this.linha.totalKmEmbreagemFabrica,
      RPNFreioParadaFabrica: this.linha.rpnFreioParadaFabrica,
      RPNFreioSemaforoFabrica: this.linha.rpnFreioSemaforoFabrica,
      RPNFreioRedutorFabrica: this.linha.rpnFreioRedutorFabrica,
      totalKmFreiosFabrica: this.freiosParadaCalc,
      totalRPNEmbreagemFabrica: this.linha.totalRPNEmbreagemFabrica,
      totalRPNFreiosFabrica: this.linha.totalRPNFreiosFabrica,
      totalRPNSuspensaoFabrica: this.linha.totalRPNSuspensaoFabrica
    });

    this.linhaFabricaForm.markAsUntouched()
    this.linhaFabricaForm.markAsPristine()
  }

  onSubmit() {
    this.linhaFabricaForm.patchValue({
      totalRPNEmbreagemFabrica: this.embreagemParadaCalc + this.embreagemSemaforoCalc + this.embreagemRedutorCalc,
      totalRPNFreiosFabrica: this.freiosParadaCalc + this.freiosSemaforoCalc + this.freiosRedutorCalc,
      totalRPNSuspensaoFabrica: this.suspensaoBuracoCalc +this.suspensaoRedutorCalc + this.suspensaoCargaCalc
    });

    console.log(this.linhaFabricaForm.value)

    this.isSubmitting = true
    this._linhaService.update(this.linhaFabricaForm.value).subscribe(
      result => {
        this._toastrService.success("Valores atualizados com sucesso!", "Sucesso")
        this.linhaFabricaForm.reset()
        this.isSubmitting = false
        this.clearCalculations()
        this.linhas = []
        this._linhaService.getLinhas().subscribe(
          result => {
            this.linhas = result
            this.linha = null
          },
          error => {
            this._toastrService.error(error.error, "Erro ao carregar as linhas")
          }
        )
      },
      error => {
        console.log(error)
        this._toastrService.error(error.error, "Houve um erro ao atualizar os valores de fabrica.")
        this.isSubmitting = false
      }
    )
  }
}
