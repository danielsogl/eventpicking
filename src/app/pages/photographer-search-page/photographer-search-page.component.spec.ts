import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerSearchPageComponent } from './photographer-search-page.component';

describe('PhotographerSearchPageComponent', () => {
  let component: PhotographerSearchPageComponent;
  let fixture: ComponentFixture<PhotographerSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
