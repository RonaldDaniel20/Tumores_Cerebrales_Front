import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs";
import { GifService } from "../../services/gifs.service";
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { Gif } from "../../interfaces/gif.interface";

@Component({
    imports: [GifListComponent],
    templateUrl: './gif-history.component.html'
})

export default class GifHistoryComponent {

    query = toSignal(
        inject(ActivatedRoute).params.pipe(
            map((params) => params['q'])
        )
    )

    private gifSerice = inject(GifService);
    
    searchHistroy = computed(() => {
        return this.gifSerice.getHistoryGif(this.query());
    })
}