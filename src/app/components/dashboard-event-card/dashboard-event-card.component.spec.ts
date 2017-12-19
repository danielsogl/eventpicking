import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardEventCardComponent } from './dashboard-event-card.component';

describe('DashboardEventCardComponent', () => {
  let component: DashboardEventCardComponent;
  let fixture: ComponentFixture<DashboardEventCardComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [DashboardEventCardComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
