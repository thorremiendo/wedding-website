import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RsvpComponent } from './rsvp/rsvp.component';
import { HomeComponent } from './home/home.component';
import { PhotosComponent } from './photos/photos.component';
import { FaqComponent } from './faq/faq.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { WhatToWearComponent } from './what-to-wear/what-to-wear.component';
import { OurCrewComponent } from './our-crew/our-crew.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'rsvp',
    component: RsvpComponent
  },
  {
    path: 'photos',
    component: PhotosComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'our-story',
    component: OurStoryComponent
  },
  {
    path: 'what-to-wear',
    component: WhatToWearComponent
  },
  {
    path: 'our-crew',
    component: OurCrewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
