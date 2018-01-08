import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AsyncLocalStorageModule],
        declarations: [ShoppingCartComponent]
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
