import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment"
import { GifsResponse } from "../interfaces/gifs-request.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { finalize } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class GifService {
    
    constructor(private http: HttpClient){
        this.getGifs();
    };

    trendingGifs = signal<Gif[]>([]);
    
    //Metodo para obtener los gifs de la API
    getGifs(){
        const url: string =  `${environment.gifUrl}/gifs/trending`;

        this.http.get<GifsResponse>(url, {
                params: {
                    api_key: environment.apikeyGif,
                    limit: 20
                }
            }
        ).subscribe({
            next: (response: GifsResponse) => {
                const gifs: Gif[] = GifMapper.mapGifsResponseToGifs(response);
                this.trendingGifs.set(gifs);
            },
            error: (error) => {
                console.error('Error al obtener los gifs:', error);
            }
        });
    }
}