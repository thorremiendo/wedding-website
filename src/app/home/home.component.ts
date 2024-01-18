import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  daysUntilEvent: number = 0;
  images: string[] = [
    '../assets/1.png',
    '../assets/2.png',
    '../assets/3.png',
  ];
  currentImageIndex = 0;
  imageChangeInterval = 3000;

  constructor() { }

  ngOnInit(): void {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000 * 60 * 60 * 24); // Update every day
    setInterval(() => {
      this.currentImageIndex++;
      // Reset the index to show the first image after the last one
      if (this.currentImageIndex === this.images.length) {
        this.currentImageIndex = 0;
      }
    }, this.imageChangeInterval);
  }

  private updateCountdown() {
    const endDate = new Date('2024-03-09T00:00:00');
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();

    this.daysUntilEvent = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24))); // Prevent negative values
  }

}
