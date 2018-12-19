import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IFreio } from '../models/freio.model';


@Injectable({
  providedIn: 'root'
})
export class FreioService {

  
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	private url: string = "api/Freio"
	private api_url: string = environment.api_url
	private final_url: string = this.api_url.concat(this.url)

	constructor(private _http: HttpClient) { }

	getFreioById(id: number): Observable<IFreio> {
		const url = this.final_url.concat(`/GetById?id=${id}`)
		return this._http.get<IFreio>(url)
	}

	getFreio(): Observable<IFreio[]> {
		return this._http.get<IFreio[]>(this.final_url)
	}

	saveFreio(formValues: any) {
		console.log("freio form:"+formValues)
		const body = JSON.stringify(formValues)
		return this._http.post(this.final_url, body, this.httpOptions)
	}

	delete(id: number) {
		const url = `${this.final_url}/${id}`;
		return this._http.delete(url, this.httpOptions)
	}

	update(linha: IFreio) {
		return this._http.put(this.final_url, linha, this.httpOptions)
	}
}
