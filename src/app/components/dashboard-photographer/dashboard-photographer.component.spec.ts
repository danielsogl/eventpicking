import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MDBBootstrapModules } from 'ng-mdb-pro';

import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { DashboardPhotographerComponent } from './dashboard-photographer.component';

describe('DashboardPhotographerComponent', () => {
  let component: DashboardPhotographerComponent;
  let fixture: ComponentFixture<DashboardPhotographerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MDBBootstrapModules.forRoot(),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
        declarations: [DashboardPhotographerComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
