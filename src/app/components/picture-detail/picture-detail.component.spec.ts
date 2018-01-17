import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MDBBootstrapModules } from 'ng-mdb-pro/mdb.module';

import { PictureDetailComponent } from './picture-detail.component';
import {
  AsyncLocalStorageModule,
  AsyncLocalStorage
} from 'angular-async-local-storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { FormsModule } from '@angular/forms';

describe('PictureDetailComponent', () => {
  let component: PictureDetailComponent;
  let fixture: ComponentFixture<PictureDetailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          MDBBootstrapModules.forRoot(),
          AsyncLocalStorageModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
        providers: [AsyncLocalStorage],
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
