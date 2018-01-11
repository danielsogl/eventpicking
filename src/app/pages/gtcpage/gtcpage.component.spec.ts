import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtcpageComponent } from './gtcpage.component';

describe('GtcpageComponent', () => {
  let component: GtcpageComponent;
  let fixture: ComponentFixture<GtcpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtcpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtcpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
