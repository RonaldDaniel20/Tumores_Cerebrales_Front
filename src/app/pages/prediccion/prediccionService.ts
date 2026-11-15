import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface Prediccion {
    status: string,
    message: string,
    tipo_de_tumor: string,
    confianza: string 
}

@Injectable({
    providedIn: 'root'
})

export class PrediccionService {

    private urlApi = '/api/modelo/predecir'

    constructor(private http: HttpClient){}

    getPrediccion(file: File): Observable<Prediccion>{
        const formData = new FormData();
        formData.append('imagen', file, file.name)

        return this.http.post<Prediccion>(this.urlApi, formData)
    }
    
}