import { Component, signal } from "@angular/core";
import { GifService } from "../../services/gifs.service";
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { Gif } from "../../interfaces/gif.interface";
import { GifsResponse } from "../../interfaces/gifs-request.interface";
import { GifMapper } from "../../mapper/gif.mapper";
import { NotificationService } from "../../../share/service/notification.service";
import { finalize } from "rxjs";

@Component({
    imports: [GifListComponent],
    templateUrl: './search-page.component.html'
})

export default class SearchPageComponent {

    constructor(private gifService: GifService, private notificacionService: NotificationService){};

    gifSearch = signal<Gif[]>([]);

    onBuscarGif(query: string){
        this.gifService.searchGifs(query)
        .pipe(
            finalize(() => {
                const inputSearch = document.getElementById('input-search') as HTMLInputElement
                if(inputSearch){
                    inputSearch.value = ''
                }

            })
        )
        .subscribe({
            next: (response: Gif[]) => {
                this.gifSearch.set(response);
            },
            error: (error: unknown) => {
                if(error instanceof Error){
                    this.notificacionService.mostrarInformacion(`Ha sucedido un error ${error.message}`, 'error');
                }
            }
        });
    }
}