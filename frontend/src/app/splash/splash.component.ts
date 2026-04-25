import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SplashComponent implements OnInit {
  @Output() splashDone = new EventEmitter<void>();
  animando = false;

  ngOnInit() {
    setTimeout(() => this.animando = true, 100);
    setTimeout(() => this.splashDone.emit(), 2800);
  }
}