import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { FeaturesPageComponent } from './features-page.component';

describe('FeaturesPageComponent', () => {
  let component: FeaturesPageComponent;
  let fixture: ComponentFixture<FeaturesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        })
      ],
      declarations: [ FeaturesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
