import { Component, OnInit } from '@angular/core'
import { LinhaService } from '../services/linha.service';

@Component({
	selector: 'app-rpncalculator',
	templateUrl: './rpncalculator.component.html',
	styleUrls: ['./rpncalculator.component.css']
})
export class RPNCalculatorComponent implements OnInit {

	constructor(private _linhaService: LinhaService) { }

	ngOnInit() {

		this._linhaService.getLinhas().subscribe(
			result => {
				console.log(result)
			},
			error => {
				console.log(error)
			}
		)
	}

}
