import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerPageComponent } from './photographer-page.component';

describe('PhotographerPageComponent', () => {
  let component: PhotographerPageComponent;
  let fixture: ComponentFixture<PhotographerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
