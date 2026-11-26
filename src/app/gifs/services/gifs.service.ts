import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment"
import { GifsResponse } from "../interfaces/gifs-request.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { finalize, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class GifService {
    
    constructor(private http: HttpClient){
        this.getGifs();
    };
    
    private static readonly URLBASE = `${environment.gifUrl}`;

    trendingGifs = signal<Gif[]>([]);

    //========================================//
    // Metodo para obtener los gifs de la API //
    //========================================//

    getGifs(): void{
        const url: string =  `${GifService.URLBASE}/gifs/trending`;

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

    //========================================//
    //  Metodo para buscar un GIF en la api   //
    //========================================//

    searchGifs(query: string): Observable<GifsResponse>{
        const url = `${GifService.URLBASE}/gifs/search`;

        return this.http.get<GifsResponse>(url, {
            params: {
                api_key: environment.apikeyGif,
                q: query,
                limit: 20
            }
        })
    }
}