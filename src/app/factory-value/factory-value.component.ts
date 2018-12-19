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

  isSubmitting: boolean = false

  linhaFabricaForm = new FormGroup({
    linhaId: new FormControl(''),
    suspensaoBuraco: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    suspensaoRedutor: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    suspensaoCarga: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    suspensaoKm: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalRPNFreiosFabrica: new FormControl(null),
    embreagemParada: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    embreagemSemaforo: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    embreagemRedutor: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    embreagemKm: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalRPNEmbreagemFabrica: new FormControl(null),
    freiosParada: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    freiosSemaforo: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    freiosRedutor: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    freiosKm: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalRPNSuspensaoFabrica: new FormControl(null)
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
    this.suspensaoBuracoCalc = this.linhaFabricaForm.get('suspensaoBuraco').value
    this.suspensaoRedutorCalc = this.linhaFabricaForm.get('suspensaoRedutor').value
    this.suspensaoCargaCalc = this.linhaFabricaForm.get('suspensaoCarga').value
    this.suspensaoKmCalc = this.linhaFabricaForm.get('suspensaoKm').value

    this.embreagemParadaCalc = this.linhaFabricaForm.get('embreagemParada').value
    this.embreagemSemaforoCalc = this.linhaFabricaForm.get('embreagemSemaforo').value
    this.embreagemRedutorCalc = this.linhaFabricaForm.get('embreagemRedutor').value
    this.embreagemKmCalc = this.linhaFabricaForm.get('embreagemKm').value

    this.freiosParadaCalc = this.linhaFabricaForm.get('freiosParada').value
    this.freiosSemaforoCalc = this.linhaFabricaForm.get('freiosSemaforo').value
    this.freiosRedutorCalc = this.linhaFabricaForm.get('freiosRedutor').value
    this.freiosKmCalc = this.linhaFabricaForm.get('freiosKm').value
  }

  setLinha(){
    const linhaFiltro = this.linhas.filter(x => x.linhaId == this.linhaFabricaForm.get('linhaId').value)
    if(!linhaFiltro || linhaFiltro.length == 0) return
    this.linha = linhaFiltro[0]
    this.setForm()
  }

  setForm() {
    this.linhaFabricaForm.patchValue({
      linhaId: this.linha.linhaId,
      suspensaoBuraco: this.linha.rpnSuspensaoBuracoFabrica,
      suspensaoRedutor: this.linha.rpnSuspensaoRedutorFabrica,
      suspensaoCarga: this.linha.rpnSuspensaoCargaFabrica,
      suspensaoKm: this.linha.totalKmSuspensaoFabrica,
      embreagemParada: this.linha.rpnEmbreagemParadaFabrica,
      embreagemSemaforo: this.linha.rpnEmbreagemSemaforoFabrica,
      embreagemRedutor: this.linha.rpnEmbreagemRedutorFabrica,
      embreagemKm: this.linha.totalKmEmbreagemFabrica,
      freiosParada: this.linha.rpnFreioParadaFabrica,
      freiosSemaforo: this.linha.rpnFreioSemaforoFabrica,
      freiosRedutor: this.linha.rpnFreioRedutorFabrica,
      freiosKm: this.linha.totalKmFreiosFabrica
    });

    this.linhaFabricaForm.markAsUntouched()
    this.linhaFabricaForm.markAsPristine()
  }

  onSubmit() {
    console.log(this.linhaFabricaForm)

    this.isSubmitting = true
    this._linhaService.saveLinha(this.linhaFabricaForm.value).subscribe(
      result => {
        this._toastrService.success("Valores atualizados com sucesso!", "Sucesso")
        this.linhaFabricaForm.reset()
        this.isSubmitting = false
      },
      error => {
        console.log(error)
        this._toastrService.error(error.error, "Houve um erro ao atualizar os valores de fabrica.")
        this.isSubmitting = false
      }
    )
  }
}
