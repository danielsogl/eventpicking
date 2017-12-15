import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPhotographerComponent } from './event-photographer.component';

describe('EventPhotographerComponent', () => {
  let component: EventPhotographerComponent;
  let fixture: ComponentFixture<EventPhotographerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPhotographerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
