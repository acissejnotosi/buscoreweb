import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { ISeveridade } from '../models/severidade.model';


@Injectable({
	providedIn: 'root'
})
export class SeveridadeService {

	private url: string = "api/Severidade"
	private api_url: string = environment.api_url
	private final_url: string = this.api_url.concat(this.url)

	constructor(private _http: HttpClient) { }

	getTipoOnibus(): Observable<ISeveridade[]> {
		return this._http.get<ISeveridade[]>(this.final_url)
	}
}