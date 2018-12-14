import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ILinha } from '../models/linha.model'
import { environment } from '../../environments/environment'

@Injectable({
	providedIn: 'root'
})
export class LinhaService {

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	private url: string = "api/linha"
	private api_url: string = environment.api_url
	private final_url: string = this.api_url.concat(this.url)

	constructor(private _http: HttpClient) { }

	getLinhas(): Observable<ILinha[]> {
		return this._http.get<ILinha[]>(this.final_url)
	}

	saveLinha(formValues: any) {
		let body = JSON.stringify(formValues)
		return this._http.post(this.final_url, body, this.httpOptions)
	}
}