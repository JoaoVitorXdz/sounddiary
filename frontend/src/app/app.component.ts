import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './splash/splash.component';

@Component({
  selector: 'app-root',
  template: `
    <app-splash *ngIf="showSplash" (splashDone)="showSplash = false"></app-splash>
    <ion-app [style.display]="showSplash ? 'none' : 'block'">
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CommonModule, SplashComponent],
})
export class AppComponent {
  showSplash = true;
}