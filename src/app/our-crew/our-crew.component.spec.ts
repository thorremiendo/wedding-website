import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCrewComponent } from './our-crew.component';

describe('OurCrewComponent', () => {
  let component: OurCrewComponent;
  let fixture: ComponentFixture<OurCrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurCrewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
