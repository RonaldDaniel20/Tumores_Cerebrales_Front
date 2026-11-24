import { Gif } from "../interfaces/gif.interface";
import { GifsResponse } from "../interfaces/gifs-request.interface";

export class GifMapper {

    static mapGifsResponseToGifs(response: GifsResponse): Gif[] {
        return response.data.map((gif) => ({
            id: gif.id,
            title: gif.title,
            url: gif.images.original.url
        }))
    }



}