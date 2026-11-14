import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SpinnerService } from "../service/spineer.service";

@Component({
    selector: 'app-spinner',
    templateUrl: './spineer.component.html'
})

export class SpinnerComponent {
    private readonly spinner = inject(SpinnerService);
    isLoading = this.spinner.isLoading

}