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

  linhas: ILinha[]
  linhasFiltro: ILinha[]

  selectedLinha: any
  constructor(private _tostrService: ToastrService, private _linhaService: LinhaService) { }

  ngOnInit() {
    this.getLinhas()
  }

  getLinhas() {
    this._linhaService.getLinhas().subscribe(
      result => {
        this.linhas = result
        this.linhasFiltro = result
        console.log(this.linhas)
      },
      error => {
        console.log(error)
        this._tostrService.error(error.message, "Ocorreu um erro ao carregar as linhas")
      }
    )
  }

  filtrarLinha() {
    if (this.selectedLinha > 0) {
      this.linhasFiltro = this.linhas.filter(x => x.linhaId == this.selectedLinha)
    }
    else {
      this.linhasFiltro = this.linhas
    }
  }
}
