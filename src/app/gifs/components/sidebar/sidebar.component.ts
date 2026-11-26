import { Component, computed } from "@angular/core";
import { GifsSideMenuHeaderComponent } from "./header-sidebar/gifs-side-menu-header.component";
import { GifsSideMenuOptionsComponent } from "./options-sidebar/gifs-side-menu-options.component";
import { GifsSideMenuOptionsInterface } from "../../interfaces/gifs-side-menu-options-interface";
import { GifService } from "../../services/gifs.service";
//import { Gif } from "../../interfaces/gif.interface";
import { RecordSearchComponent } from "./recordSearch-sidebar/recordSearch.component";

@Component({
    selector: 'app-sidebar',
    imports: [GifsSideMenuHeaderComponent, GifsSideMenuOptionsComponent, RecordSearchComponent],
    templateUrl: './sidebar.component.html',
})

export class SideBarComponent {

    sideBarOptions: GifsSideMenuOptionsInterface[] = [
        {
            title: 'Dashboard',
            subtitle: 'Data Overview',
            icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/dashboard.webp',
            route: '/dashboard'
        },
        {
            title: 'Trending',
            subtitle: 'Gifs populares',
            icon: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/purewiki.webp',
            route: 'trending'
        },
        {
            title: 'Search Page',
            subtitle: 'Buscar Gifs',
            icon: 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/searxng.webp',
            route: 'search'
        }
    ]

    constructor(private gifService: GifService){}

    searchHistoryKeys = computed<string[]>(() => {
            return this.gifService.searchHistoryKeys()
        }
    )
}