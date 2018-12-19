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

  suspensaoBuraco: number = 0
  suspensaoRedutor: number = 0
  suspensaoCarga: number = 0
  suspensaoKm: number = 0

  embreagemParada: number = 0
  embreagemSemaforo: number = 0
  embreagemRedutor: number = 0
  embreagemKm: number =0

  freiosParada: number = 0
  freiosSemaforo: number = 0
  freiosRedutor: number = 0
  freiosKm: number = 0

  isSubmitting: boolean = false

  linhaFabricaForm = new FormGroup({
    linhaId: new FormControl(''),
    suspensaoBuraco: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    suspensaoRedutor: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    suspensaoCarga: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    suspensaoKm: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalRPNFreiosFabrica: new FormControl(null),
    embreagemParada: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    embreagemSemaforo: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    embreagemRedutor: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    embreagemKm: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalRPNEmbreagemFabrica: new FormControl(null),
    freiosParada: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    freiosSemaforo: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    freiosRedutor: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    freiosKm: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    totalRPNSuspensaoFabrica: new FormControl(null)
	})

  constructor(
    private _linhaService: LinhaService,
    private _toastrService: ToastrService) { }


   ngOnInit() {
    this._linhaService.getLinhas().subscribe(
      result => {
        this.linhas = result
        this.setForm()
      },
      error => {
        this._toastrService.error(error.error, "Erro ao carregar as linhas")
      }
    )
  } 

  setForm(){
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

    this.suspensaoBuraco = this.linha.rpnSuspensaoBuracoFabrica
    this.suspensaoRedutor = this.linha.rpnSuspensaoRedutorFabrica
    this.suspensaoCarga = this.linha.rpnSuspensaoCargaFabrica
    this.suspensaoKm = this.linha.totalKmSuspensaoFabrica
    this.embreagemParada = this.linha.rpnEmbreagemParadaFabrica
    this.embreagemSemaforo = this.linha.rpnEmbreagemSemaforoFabrica
    this.embreagemRedutor = this.linha.rpnEmbreagemRedutorFabrica
    this.embreagemKm = this.linha.totalKmEmbreagemFabrica
    this.freiosParada = this.linha.rpnFreioParadaFabrica
    this.freiosSemaforo = this.linha.rpnFreioSemaforoFabrica
    this.freiosRedutor = this.linha.rpnFreioRedutorFabrica
    this.freiosKm = this.linha.totalKmFreiosFabrica

    this.linhaFabricaForm.markAsUntouched()
    this.linhaFabricaForm.markAsPristine()
  }
 
  onSubmit(){
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
