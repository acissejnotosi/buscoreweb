import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ISuspensao } from '../models/suspensao.model';

@Injectable({
  providedIn: 'root'
})
export class SuspensaoService {

 
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	private url: string = "api/Suspensao"
	private api_url: string = environment.api_url
	private final_url: string = this.api_url.concat(this.url)

	constructor(private _http: HttpClient) { }

	getEmbreagemById(id: number): Observable<ISuspensao> {
		const url = this.final_url.concat(`/GetById?id=${id}`)
		return this._http.get<ISuspensao>(url)
	}

	getEmbreagem(): Observable<ISuspensao[]> {
		return this._http.get<ISuspensao[]>(this.final_url)
	}

	saveEmbreagem(formValues: any) {
		const body = JSON.stringify(formValues)
		return this._http.post(this.final_url, body, this.httpOptions)
	}

	delete(id: number) {
		const url = `${this.final_url}/${id}`;
		return this._http.delete(url, this.httpOptions)
	}

	update(linha: ISuspensao) {
		return this._http.put(this.final_url, linha, this.httpOptions)
	}
}
