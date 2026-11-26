import { computed, effect, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment"
import { GifsResponse } from "../interfaces/gifs-request.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { tap, map, Observable } from "rxjs";


const GIF_KEY = 'Gifs';

const loadGifsFromLocalStorage = (): Record<string, Gif[]> => {

    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY);
    if(!gifsFromLocalStorage || gifsFromLocalStorage == 'undefined'){
        return {}
    }
    return JSON.parse(gifsFromLocalStorage);
};

@Injectable({
    providedIn: 'root'
})

export class GifService {
    
    constructor(private http: HttpClient){
        this.getGifs();
    };
    
    private static readonly URLBASE = `${environment.gifUrl}`;

    trendingGifs = signal<Gif[]>([]);
    searchHistory = signal<Record<string, Gif[]>>(loadGifsFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    //=============================================//
    // Almacenamiento de los gifs en local storage //
    //=============================================//

    saveHistoryToLocalStorage = effect(() => {
        const historyToString: string = JSON.stringify(this.searchHistory());
        return localStorage.setItem(GIF_KEY, historyToString);
    })

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

    searchGifs(query: string): Observable<Gif[]>{
        const url = `${GifService.URLBASE}/gifs/search`;

        return this.http.get<GifsResponse>(url, {
            params: {
                api_key: environment.apikeyGif,
                q: query,
                limit: 20
            }
        }).pipe(
            map((response) => GifMapper.mapGifsResponseToGifs(response)),
            tap((gifs) => {
                this.searchHistory.update((history) => ({
                    ...history,
                    [query.toLocaleLowerCase()]: gifs
                }))
            })
        )
    }

    //==========================================//
    //  Metodo para buscar en cache una query   //
    //==========================================//
    getHistoryGif(query: string): Gif[]{
        return this.searchHistory()[query] ?? [];
    }
}