import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  public list =
    [
      {
        "question": "When and where will the wedding take place?",
        "answer": "The wedding is scheduled for March 9, 2024, at 2 PM (sharp). The ceremony and reception will both be held at Manduto, Pinewoods Golf & Country Club. We recommend arriving at least 30 minutes prior to the start time to allow for parking and seating."
      },
      {
        "question": "Can I take photos or videos during the ceremony or reception?",
        "answer": "We are having an 'unplugged ceremony', meaning we kindly ask that you refrain from taking photos or videos as we have professional photographers/videographers capturing these special moments. Feel free to take as many photos as you'd like during the reception!"
      },
      {
        "question": "Are there any accommodations for out-of-town guests?",
        "answer": "While we won't be providing accommodations for out-of-town guests, you can find a list of accommodations at visita.baguio.gov.ph. We recommend booking your accommodations early. If you need any further information or assistance, please feel free to reach out to us!"
      },
      {
        "question": "What should I wear?",
        "answer": "Please dress in black, white, or a combination of both to honor our black-and-white theme. No wearing of caps, t-shirts, jeans & slippers. We recommend bringing a jacket or a coat to stay comfortable throughout the night, especially as our venue is outdoors and it can get quite chilly in the evenings."
      },
      {
        "question": "Is parking available at the venue?",
        "answer": "Yes, there is ample parking available at the venue."
      },
      {
        "question": "Can I bring a plus one?",
        "answer": "Due to venue capacity, we are only able to accommodate those individuals explicitly named on the RSVP."
      },
      {
        "question": "What is the RSVP deadline?",
        "answer": "Please RSVP by February 19, 2024. You can do so through our website."
      },
      {
        "question": "Will the ceremony or reception be live-streamed for those who cannot attend?",
        "answer": "Yes. We are planning to live-stream the wedding. Details will be provided closer to the date for those who are interested."
      },
      {
        "question": "Will there be a cocktail hour?",
        "answer": "Yes, there will be a cocktail hour around 7pm. Enjoy a selection of drinks and hors d'oeuvres."
      },
      {
        "question": "Is smoking/vape allowed at the venue?",
        "answer": "In compliance with city regulations, our wedding venue is a smoke-free environment. We kindly request that all guests respect this no-smoking policy within the venue and the surrounding city areas."
      },
      {
        "question": "Are children welcome at the wedding?",
        "answer": "Absolutely, we are thrilled to welcome families and their little ones! Children are welcome as long as they are included in the RSVP list."
      },
      {
        "question": "How can we contribute to your future together?",
        "answer": "Your presence at our wedding is the greatest gift of all. However, if you wish to celebrate with a gift, we kindly suggest a monetary contribution towards our future together. This thoughtful gesture will help us embark on our married life and achieve the dreams we've set out for our future. We deeply appreciate your generosity and support."
      }
    ]



  constructor() { }

  ngOnInit(): void {
  }

}
