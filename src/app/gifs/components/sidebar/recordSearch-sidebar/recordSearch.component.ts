import { Component, input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-record-search",
    imports: [RouterLink, RouterLinkActive],
    templateUrl: "./recordSearch.component.html"

})
export class RecordSearchComponent {
    
    recordSearch = input.required<string>();

}
