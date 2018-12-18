import { Component, OnInit } from '@angular/core';
import { DeteccaoService } from '../services/deteccao.service'
import { SeveridadeService } from '../services/severidade.service'
import { OcorrenciaService } from '../services/ocorrencia.service'
import { IDeteccao } from '../models/detecacao.model';
import { IOcorrencia } from '../models/ocorrencia.model';
import { ISeveridade } from '../models/severidade.model';
import { ActivatedRoute, Router } from '@angular/router';

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
  deteccaoTable : IDeteccao[]
  ocorrenciaTable : IOcorrencia[]
  severidadeTable : ISeveridade[]
  conteudo1 : boolean
  conteudo2 : boolean
  conteudo3 : boolean

  constructor( private _deteccaoTableService: DeteccaoService,
    private _severidadeTableService: SeveridadeService,
    private _ocorrenciaTableService: OcorrenciaService,
    private _routerNavigate: Router,
    private _router: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getDeteccaoTable()
    this.getOcorrenciaTable()
    this.getSeveridadeTable()
    this.conteudo1 = false
    this.conteudo2 = false
    this.conteudo3 = false
  }

  getAuxTable() {
      console.log(this.selectedTipo)
      
      if(this.selectedTipo == TYPE1){
        this.conteudo1 = true
        this.conteudo2 = false
        this.conteudo3 = false
      }else
      if(this.selectedTipo == TYPE2){
        this.conteudo1 = false
        this.conteudo2 = true
        this.conteudo3 = false
      }else
      if(this.selectedTipo == TYPE3){
        this.conteudo1 = false
        this.conteudo2 = false
        this.conteudo3 = true
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

  getSeveridadeTable(){

    this._severidadeTableService.getSeveridade().subscribe(
			result => {
				this.severidadeTable = result
			},
			error => {
				console.log(error)
			})
  }

  getOcorrenciaTable(){

    this._ocorrenciaTableService.getOcorrencia().subscribe(
			result => {
        this.ocorrenciaTable = result
        console.log(this.ocorrenciaTable)
			},
			error => {
				console.log(error)
      })
      
      
  }

  editarTabela() {
    this._routerNavigate.navigate(['/view-line']);
  }


}
