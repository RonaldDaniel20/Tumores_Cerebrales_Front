import { Component, input, signal } from "@angular/core";

@Component({
    selector: 'app-gif-list-item',
    templateUrl: './gif-list-item.component.html',
})
export class GifListItemComponent {
    urlGif = input.required<string>();
}
