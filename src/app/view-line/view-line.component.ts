import { Component, OnInit } from '@angular/core'
import { LinhaService } from '../services/linha.service'
import { ILinha } from '../models/linha.model'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-line',
  templateUrl: './view-line.component.html',
  styleUrls: ['./view-line.component.css']
})
export class ViewLineComponent implements OnInit {

  linhas: ILinha[]
  isDeleting: boolean = false

  constructor(
    private _linhaService: LinhaService,
    private _tostrService: ToastrService,
    private _router: Router) { }

  ngOnInit() {
    this.linhas = []
    
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
    if (confirm(`Deseja remover a linha: ${linha.nomeLinha}'`)) {

      this.isDeleting = true

      this._linhaService.delete(linha.linhaId).subscribe(
        result => {
          this._tostrService.success("Linha removida com sucesso!", "Registro removido")
          this.isDeleting = false
          this.linhas = this.linhas.filter(x => x.linhaId != linha.linhaId)
        },
        error => {
          this._tostrService.error("Ocorreu um erro ao remover a linha.", "Erro")
          this.isDeleting = false
        }
      )
    }
  }

  editarLinha(linha: ILinha) {
    console.log(linha)
    this._router.navigate(['/edit-line', linha.linhaId]);
  }
}