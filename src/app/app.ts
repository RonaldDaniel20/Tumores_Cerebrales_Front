import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './share/components/spineer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-app');
}
