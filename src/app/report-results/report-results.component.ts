import { Component, OnInit } from '@angular/core';
import { LinhaService } from '../services/linha.service';
import { SuspensaoService } from '../services/suspensao.service';
import { FreioService } from '../services/freio.service';
import { EmbreagemService } from '../services/embreagem.service';
import { ILinha } from '../models/linha.model';
import { ISuspensaoReport } from '../models/suspensaoReportView.model';
import { ToastrService } from 'ngx-toastr';
import { IfreioReport } from '../models/freioReportView.model';
import { IEmbreagemReport } from '../models/embreagemReportView.model';

@Component({
  selector: 'app-report-results',
  templateUrl: './report-results.component.html',
  styleUrls: ['./report-results.component.css']
})
export class ReportResultsComponent implements OnInit {

  linha: ILinha
  suspensao: ISuspensaoReport
  embreagem: IEmbreagemReport
  freio: IfreioReport
  linhaid: number
  ocorRow1SBuraco: any
  seveRow1SBuraco: any
  deteRow1SBuraco: any
  ocorRow2SRedutor: any
  seveRow2SRedutor: any
  deteRow2SRedutor: any
  ocorRow3SCarga: any
  seveRow3SCarga: any
  deteRow3SCarga: any
  ocorRow1FParada: any
  seveRow1FParada: any
  deteRow1FParada: any
  ocorRow2FSemaforo: any
  seveRow2FSemaforo: any
  deteRow2FSemaforo: any
  ocorRow3FRedutor: any
  seveRow3FRedutor: any
  deteRow3FRedutor: any
  ocorRow1EParada: any
  seveRow1EParada: any
  deteRow1EParada: any
  ocorRow2ESemaforo: any
  seveRow2ESemaforo: any
  deteRow2ESemaforo: any
  ocorRow3ERedutor: any
  seveRow3ERedutor: any
  deteRow3ERedutor: any
  constructor(private _linhaService: LinhaService,
    private _freioService: FreioService,
    private _embreagemService: EmbreagemService,
    private _suspensaoService: SuspensaoService,
    private _tostrService: ToastrService) { }

  ngOnInit() {

    //ID da linha:
    this.linhaid = JSON.parse(localStorage.getItem("linhaId"))
    this.getLinhaById(this.linhaid)
    
    this.getEmbreagemByLinhaId(this.linhaid)
    this.getFreioByIdlinhaId(this.linhaid)
    this.getSuspensaoByLinhaId(this.linhaid)

    //Suspensao
    this.ocorRow1SBuraco = JSON.parse(localStorage.getItem("ocorSuspensaor1"));
    this.seveRow1SBuraco = JSON.parse(localStorage.getItem("seveSuspensaor1"));
    this.deteRow1SBuraco = JSON.parse(localStorage.getItem("deteSuspensaor1"));
    this.ocorRow2SRedutor = JSON.parse(localStorage.getItem("ocorSuspensaor2"));
    this.seveRow2SRedutor = JSON.parse(localStorage.getItem("seveSuspensaor2"));
    this.deteRow2SRedutor = JSON.parse(localStorage.getItem("deteSuspensaor2"));
    this.ocorRow3SCarga = JSON.parse(localStorage.getItem("ocorSuspensaor3"));
    this.seveRow3SCarga = JSON.parse(localStorage.getItem("seveSuspensaor3"));
    this.deteRow3SCarga = JSON.parse(localStorage.getItem("deteSuspensaor3"));
    //Freio
    this.ocorRow1FParada = JSON.parse(localStorage.getItem("ocorFreior1"));
    this.seveRow1FParada = JSON.parse(localStorage.getItem("seveFreior1"));
    this.deteRow1FParada = JSON.parse(localStorage.getItem("deteFreior1"));
    this.ocorRow2FSemaforo = JSON.parse(localStorage.getItem("ocorFreior2"));
    this.seveRow2FSemaforo = JSON.parse(localStorage.getItem("seveFreior2"));
    this.deteRow2FSemaforo = JSON.parse(localStorage.getItem("deteFreior2"));
    this.ocorRow3FRedutor = JSON.parse(localStorage.getItem("ocorFreior3"));
    this.seveRow3FRedutor = JSON.parse(localStorage.getItem("seveFreior3"));
    this.deteRow3FRedutor = JSON.parse(localStorage.getItem("deteFreior3"));
    //Embreagem
    this.ocorRow1EParada = JSON.parse(localStorage.getItem("ocorEmbreagemr1"));
    this.seveRow1EParada = JSON.parse(localStorage.getItem("seveEmbreagemr1"));
    this.deteRow1EParada = JSON.parse(localStorage.getItem("deteEmbreagemr1"));
    this.ocorRow2ESemaforo = JSON.parse(localStorage.getItem("ocorEmbreagemr2"));
    this.seveRow2ESemaforo = JSON.parse(localStorage.getItem("seveEmbreagemr2"));
    this.deteRow2ESemaforo = JSON.parse(localStorage.getItem("deteEmbreagemr2"));
    this.ocorRow3ERedutor = JSON.parse(localStorage.getItem("ocorEmbreagemr3"));
    this.seveRow3ERedutor = JSON.parse(localStorage.getItem("seveEmbreagemr3"));
    this.deteRow3ERedutor = JSON.parse(localStorage.getItem("deteEmbreagemr3"));

  }


  getLinhaById(id: number) {

    this._linhaService.getLinhaById(id).subscribe(
      result => {
        this.linha = result
        console.log(this.linha)
      },
      error => {
        this._tostrService.error(error.message, "Ocorreu um erro ao carregar as linhas")
      }
    );
  }

  getSuspensaoByLinhaId(id: number) {

    this._suspensaoService.getSuspensaoByLinhaId(id).subscribe(
      result => {
        console.log(result)
        this.suspensao = result
      }, error => {
        console.log(error)
        this._tostrService.error(error.message, "Ocorreu um erro ao carregar as linhas")
      }

    );
  }

  getFreioByIdlinhaId(id: number) {

    this._freioService.getFreioByLinhaId(id).subscribe(
      result => {
        this.freio = result
      }, error => {
        console.log(error)
        this._tostrService.error(error.message, "Ocorreu um erro ao carregar as linhas")
      }

    );
  }


  getEmbreagemByLinhaId(id: number) {

    this._embreagemService.getEmbreagemByLinhaId(id).subscribe(
      result => {
        console.log(result)
        this.embreagem = result
      }, error => {
        console.log(error)
        this._tostrService.error(error.message, "Ocorreu um erro ao carregar as linhas")
      }

    );
  }



}
