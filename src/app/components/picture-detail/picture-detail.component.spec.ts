import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MDBBootstrapModules } from 'ng-mdb-pro/mdb.module';

import { PictureDetailComponent } from './picture-detail.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';

describe('PictureDetailComponent', () => {
  let component: PictureDetailComponent;
  let fixture: ComponentFixture<PictureDetailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          MDBBootstrapModules.forRoot(),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
        providers: [AlertService],
        declarations: [PictureDetailComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
