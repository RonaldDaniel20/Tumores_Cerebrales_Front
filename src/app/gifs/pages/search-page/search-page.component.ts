import { Component } from "@angular/core";
import { GifService } from "../../services/gifs.service";
import { GifsResponse } from "../../interfaces/gifs-request.interface";

@Component({
    template: "<h1>Hola Search</h1>"
})

export default class SearchPageComponent {

    constructor(private gifService: GifService){};


}