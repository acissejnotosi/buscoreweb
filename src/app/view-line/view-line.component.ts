import { Component, OnInit } from '@angular/core'
import { LinhaService } from '../services/linha.service'
import { ILinha } from '../models/linha.model'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-line',
  templateUrl: './view-line.component.html',
  styleUrls: ['./view-line.component.css']
})
export class ViewLineComponent implements OnInit {

  linhas: ILinha[]
  constructor(
    private _linhaService: LinhaService,
    private _tostrService: ToastrService) { }

  ngOnInit() {
    this._linhaService.getLinhas().subscribe(
      result => {
        this.linhas = result
      },
      error => {
        console.log(error)
          this._tostrService.error(error.message, "Ocorreu um erro ao carregar as linhas")
      }
    )
  }

  removerLinha(linha: ILinha) {
    console.log(linha)
  }
}
