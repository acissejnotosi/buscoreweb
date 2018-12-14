import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { IOcorrencia } from '../models/ocorrencia.model';


@Injectable({
	providedIn: 'root'
})
export class OcorrenciaService {

	private url: string = "api/Ocorrencias"
	private api_url: string = environment.api_url
	private final_url: string = this.api_url.concat(this.url)

	constructor(private _http: HttpClient) { }

	getTipoOnibus(): Observable<IOcorrencia[]> {
		return this._http.get<IOcorrencia[]>(this.final_url)
	}
}