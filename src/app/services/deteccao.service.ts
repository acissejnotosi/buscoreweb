import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { IDeteccao } from '../models/detecacao.model';


@Injectable({
	providedIn: 'root'
})
export class DeteccaoService {

	private url: string = "api/Deteccao"
	private api_url: string = environment.api_url
	private final_url: string = this.api_url.concat(this.url)

	constructor(private _http: HttpClient) { }

	getDeteccao(): Observable<IDeteccao[]> {
		return this._http.get<IDeteccao[]>(this.final_url)
	}
}