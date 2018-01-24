import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProtectionPageComponent } from './data-protection-page.component';

describe('DataProtectionPageComponent', () => {
  let component: DataProtectionPageComponent;
  let fixture: ComponentFixture<DataProtectionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProtectionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProtectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
