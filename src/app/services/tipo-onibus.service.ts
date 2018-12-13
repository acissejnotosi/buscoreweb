import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { ITipoOnibus } from '../models/tipo-onibus.model'

@Injectable({
	providedIn: 'root'
})
export class TipoOnibusService {

	private url: string = "api/tipoOnibus"
	private api_url: string = environment.api_url
	private final_url: string = this.api_url.concat(this.url)

	constructor(private _http: HttpClient) { }

	getTipoOnibus(): Observable<ITipoOnibus[]> {
		return this._http.get<ITipoOnibus[]>(this.final_url)
	}
}