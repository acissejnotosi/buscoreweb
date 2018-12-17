import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { IOcorrencia } from '../models/ocorrencia.model';


@Injectable({
	providedIn: 'root'
})
export class OcorrenciaService {

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	private url: string = "api/Ocorrencia"
	private api_url: string = environment.api_url
	private final_url: string = this.api_url.concat(this.url)

	constructor(private _http: HttpClient) { }

	getOcorrencia(): Observable<IOcorrencia[]> {
		console.log(this.final_url)
      return this._http.get<IOcorrencia[]>(this.final_url,this.httpOptions)
	
	}
}