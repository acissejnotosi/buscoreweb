import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, ObservableLike } from 'rxjs'
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

	getLinhaById(id: number): Observable<ILinha> {
		const url = this.final_url.concat(`/GetById?id=${id}`)
		return this._http.get<ILinha>(url)
	}

	getLinhas(): Observable<ILinha[]> {
		return this._http.get<ILinha[]>(this.final_url)
	}

	saveLinha(formValues: any) {
		const body = JSON.stringify(formValues)
		return this._http.post(this.final_url, body, this.httpOptions)
	}

	delete(id: number) {
		const url = `${this.final_url}/${id}`;
		return this._http.delete(url, this.httpOptions)
	}

	update(linha: ILinha) {
		return this._http.put(this.final_url, linha, this.httpOptions)
	}
}