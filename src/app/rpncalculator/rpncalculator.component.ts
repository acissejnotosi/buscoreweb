import { Component, OnInit } from '@angular/core'
import { LinhaService } from '../services/linha.service';
import { ILinha } from '../models/linha.model';

@Component({
	selector: 'app-rpncalculator',
	templateUrl: './rpncalculator.component.html',
	styleUrls: ['./rpncalculator.component.css']
})
export class RPNCalculatorComponent implements OnInit {

	linhas: ILinha[]
	ocor1: number
	seve1: number
	dete1: number
	ocor2: number
	seve2: number
	dete2: number
	ocor3: number
	seve3: number
	dete3: number
	RPNT1: number
	RPNT2: number
	RPNT3: number

	constructor(private _linhaService: LinhaService) { }

	ngOnInit() {
		this.getLinhas()
		this.ocor1 = 0
		this.seve1 = 0
		this.dete1 = 0
		this.ocor2 = 0
		this.seve2 = 0
		this.dete2 = 0
		this.ocor3 = 0
		this.seve3 = 0
		this.dete3 = 0
	}


	getLinhas() {

		this._linhaService.getLinhas().subscribe(
			result => {
				this.linhas = result
			},
			error => {
				console.log(error)
			}
		)
	}

	setRPN1(){
		this.RPNT1 =
			(this.ocor1 * this.seve1 * this.dete1) + 
			(this.ocor2 * this.seve2 * this.dete2) +
			(this.ocor3 * this.seve3 * this.dete3)
	}

	setRPN2(){
		this.RPNT2 = 0
	}

	setRPN(){
		this.RPNT3 = 0
	}
}