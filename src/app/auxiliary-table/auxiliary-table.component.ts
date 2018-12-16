import { Component, OnInit } from '@angular/core';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { IAuxTable } from '../models/auxtable.model';
import { DeteccaoService } from '../services/deteccao.service'
import { SeveridadeService } from '../services/severidade.service'
import { OcorrenciaService } from '../services/ocorrencia.service'
import { IDeteccao } from '../models/detecacao.model';
import { IOcorrencia } from '../models/ocorrencia.model';
import { ISeveridade } from '../models/severidade.model';

const TYPE1 : string = "type1"
const TYPE2 : string = "type2"
const TYPE3 : string = "type3"

@Component({
  selector: 'app-auxiliary-table',
  templateUrl: './auxiliary-table.component.html',
  styleUrls: ['./auxiliary-table.component.css']
})
export class AuxiliaryTableComponent implements OnInit {

  selectedTipo : any
  auxTable : any
  deteccaoTable : IDeteccao[]
  ocorrenciaTable : IOcorrencia[]
  severidadeTable : ISeveridade[]
  private _deteccaoTableService: DeteccaoService
  private _severidadeTableService: SeveridadeService
  private _ocorrenciaTableService: OcorrenciaService
  
  constructor() { }

  ngOnInit() {
    this.getDeteccaoTable()
    this.getOcorrenciaTable()
    this.getSeveridadeTable()
  }


  getAuxTable() {
      console.log(this.selectedTipo)
      
      if(this.selectedTipo == TYPE1){
        this.auxTable = this.ocorrenciaTable
      }else
      if(this.selectedTipo == TYPE2){
        this.auxTable = this.severidadeTable
      }else
      if(this.selectedTipo == TYPE3){
        this.auxTable = this.deteccaoTable
      }
  }

  getDeteccaoTable(){

    this._deteccaoTableService.getDeteccao().subscribe(
			result => {
				this.deteccaoTable = result
			},
			error => {
				console.log(error)
			})
  }

  getOcorrenciaTable(){

    this._severidadeTableService.getSeveridade().subscribe(
			result => {
				this.severidadeTable = result
			},
			error => {
				console.log(error)
			})
  }

  getSeveridadeTable(){

    this._ocorrenciaTableService.getOcorrencia().subscribe(
			result => {
				this.ocorrenciaTable = result
			},
			error => {
				console.log(error)
			})
  }


}
