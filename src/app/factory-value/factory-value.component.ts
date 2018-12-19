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

  linha: ILinha[]

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
    suspensaoBuraco: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    suspensaoRedutor: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    suspensaoCarga: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    suspensaoKm: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    embreagemParada: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    embreagemSemaforo: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    embreagemRedutor: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    embreagemKm: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    freiosParada: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    freiosSemaforo: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    freiosRedutor: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)]),
    freiosKm: new FormControl('', [Validators.required, Validators.min(1), Validators.max(99999)])
	})

  constructor(
    private _linhaService: LinhaService,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    this._linhaService.getLinhas().subscribe(
      result => {
        this.linha = result
      },
      error => {
        this._toastrService.error(error.error, "Erro ao carregar as linhas")
      }
    )
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
