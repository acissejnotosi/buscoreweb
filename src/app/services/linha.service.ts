import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ILinha } from '../models/linha.model'
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LinhaService {

	private url: string = "api/linha"
	private api_url: string = environment.api_url
	private final_url: string = this.api_url.concat(this.url)

	constructor(private _http: HttpClient) { }

	getLinhas(): Observable<ILinha> {
		console.log(this.final_url)
		return this._http.get<ILinha>(this.final_url)
	}
}