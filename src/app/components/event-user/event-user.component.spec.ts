import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUserComponent } from './event-user.component';

describe('EventUserComponent', () => {
  let component: EventUserComponent;
  let fixture: ComponentFixture<EventUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
