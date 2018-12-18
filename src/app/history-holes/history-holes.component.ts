import { Component, OnInit } from '@angular/core';
import { LinhaService } from '../services/linha.service'
import { ILinha } from '../models/linha.model'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history-holes',
  templateUrl: './history-holes.component.html',
  styleUrls: ['./history-holes.component.css']
  
})
export class HistoryHolesComponent implements OnInit {

  linhas : ILinha[]
  linhasSelect : ILinha[]
  selectedLinha : any
  constructor(  private _tostrService: ToastrService,private _linhaService: LinhaService) { }

  ngOnInit() {
    this.getLinhas()
    this.getLinhasForSelect()
  }

  getLinhasForSelect( ){
    this._linhaService.getLinhas().subscribe(
      result => {
        this.linhasSelect = result
        console.log(this.linhas)
      },
      error => {
        console.log(error)
        this._tostrService.error(error.message, "Ocorreu um erro ao carregar as linhas")
      }
    )

  }

  getLinhas(){
    this._linhaService.getLinhas().subscribe(
      result => {
        this.linhas = []
        this.linhas = result
        console.log(this.linhas)
      },
      error => {
        console.log(error)
        this._tostrService.error(error.message, "Ocorreu um erro ao carregar as linhas")
      }
    )
    
  }

  getLinhaById(id : number){
    this._linhaService.getLinhaById(id).subscribe(
      result => {
        this.linhas = []
        this.linhas[0] = result
        console.log(this.linhas)
      },
      error => {
        console.log(error)
        this._tostrService.error(error.message, "Ocorreu um erro ao carregar as linhas")
      }
    )
  }

  filtrarLinha(){

    console.log(this.selectedLinha)
    if(this.selectedLinha == 'Todas'){
      this.getLinhas()
    }else{
      this.getLinhaById(this.selectedLinha)
    }
    console.log(this.linhas)

  }

}
