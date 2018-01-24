import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ReplacePipe } from '../../pipes/string/replace/replace.pipe';
import { AlertService } from '../../services/alert/alert.service';
import { ToastModule } from 'ng-mdb-pro/pro/alerts';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ToastModule.forRoot(),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
        providers: [AlertService],
        declarations: [ShoppingCartComponent, ReplacePipe]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
