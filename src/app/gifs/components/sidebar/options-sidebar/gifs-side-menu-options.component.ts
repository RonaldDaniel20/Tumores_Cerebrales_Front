import { Component, input } from "@angular/core";
import { GifsSideMenuOptionsInterface } from "../../../interfaces/gifs-side-menu-options-interface";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'gifs-side-menu-options',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './gifs-side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {
    option = input.required<GifsSideMenuOptionsInterface>();

}