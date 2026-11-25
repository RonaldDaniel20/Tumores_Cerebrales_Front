import { Component, computed } from "@angular/core";
import { GifService } from "../../services/gifs.service";
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { Gif } from "../../interfaces/gif.interface";
//import { GifsResponse } from "../../interfaces/gifs-request.interface";

@Component({
    imports: [GifListComponent],
    templateUrl: './search-page.component.html'
})

export default class SearchPageComponent {

    constructor(private gifService: GifService){};

    gifSearch = computed<Gif[]>(() => {
        return this.gifService.searchGifStorage();
    })

    onBuscarGif(query: string): void {
        this.gifService.searchGifs(query);
    }
}