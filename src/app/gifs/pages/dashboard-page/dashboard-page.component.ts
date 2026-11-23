import { Component } from "@angular/core";
import { SideBarComponent } from "../../components/sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";

@Component({
    imports: [SideBarComponent, RouterOutlet],
    templateUrl: './dashboard-page.component.html',
})

export default class DashboardPageComponent {

}