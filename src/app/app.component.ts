import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { DataStoreService } from './data-store.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('wrapperMain', { static: true }) wrapperMain: ElementRef | undefined;

  seed: boolean = false
  guests: any[] = [];
  images: string[] = [
    '../assets/1.jpg',
    '../assets/2.jpg',
    '../assets/3.jpg',
  ];
  currentImageIndex = 0;
  imageChangeInterval = 3000; // Time in milliseconds

  constructor(
    private dataService: DataService,
    private dataStore: DataStoreService
  ) {
  }
  ngOnInit(): void {
    // this.addNewGuest()
    if (this.seed == true) {
      this.dataService.seedGuestsFromJson()
    }
    this.dataService.getGuests().subscribe(res => {
      this.dataStore.setGuests(res)
      // this.dataStore.guests$.subscribe(res => {
      //   console.log('res', res)
      // })
    }, err => {
      console.log(err)
    })
    setInterval(() => {
      this.currentImageIndex++;
      // Reset the index to show the first image after the last one
      if (this.currentImageIndex === this.images.length) {
        this.currentImageIndex = 0;
      }
    }, this.imageChangeInterval);
  }

  addNewGuest() {
    const newGuest = { name: 'Jane Doe', confirmed: false };
    this.dataService.addGuest(newGuest);
  }

  scrollToMain() {
    // Option 1: Scroll to the `wrapper__main` element
    if (this.wrapperMain && this.wrapperMain.nativeElement) {
      this.wrapperMain.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

    // Option 2: Use `ViewportScroller` to scroll to the specific position
    // const element = this.wrapperMain.nativeElement;
    // const elementRect = element.getBoundingClientRect();
    // const absoluteElementTop = elementRect.top + window.pageYOffset;
    // const offset = 70; // Adjust as necessary for fixed header, etc.
    // this.viewportScroller.scrollToPosition([0, absoluteElementTop - offset]);
  }


}
