import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MDBBootstrapModules } from 'ng-mdb-pro/mdb.module';

import { PictureDetailComponent } from './picture-detail.component';

describe('PictureDetailComponent', () => {
  let component: PictureDetailComponent;
  let fixture: ComponentFixture<PictureDetailComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MDBBootstrapModules.forRoot()],
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
