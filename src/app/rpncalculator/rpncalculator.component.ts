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

	constructor(private _linhaService: LinhaService) { }

	ngOnInit() {
		this._linhaService.getLinhas().subscribe(
			result => {
				this.linhas = result
			},
			error => {
				console.log(error)
			}
		)
	}
}