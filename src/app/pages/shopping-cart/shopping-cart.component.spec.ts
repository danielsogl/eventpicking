import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FakeLoader } from '../../../../jest-mocks/fake-loader';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ReplacePipe } from '../../pipes/string/replace/replace.pipe';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeLoader }
          })
        ],
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
