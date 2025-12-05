import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoContainerComponent } from './saldo-container.component';

describe('SaldoContainerComponent', () => {
  let component: SaldoContainerComponent;
  let fixture: ComponentFixture<SaldoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaldoContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaldoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
