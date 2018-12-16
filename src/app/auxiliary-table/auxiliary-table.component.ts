import { Component, OnInit } from '@angular/core';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { IAuxTable } from '../models/auxtable.model';
import { DeteccaoService } from '../services/deteccao.service'
import { IDeteccao } from '../models/detecacao.model';

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
  auxTable : IAuxTable 
  deteccaoTable : IDeteccao[]
  private _deteccaoTableService: DeteccaoService
  
  constructor() { }

  ngOnInit() {
  }


  getAuxTable() {
      console.log(this.selectedTipo)
      
      if(this.selectedTipo == TYPE1){
         // auxTable = 
      }else
      if(this.selectedTipo == TYPE2){

      }else
      if(this.selectedTipo == TYPE3){

      }
  }

  getDeteccaoTable(){

    this._deteccaoTableService.getTipoOnibus().subscribe(
			result => {
				this.deteccaoTable = result
			},
			error => {
				console.log(error)
			}
  }


}
