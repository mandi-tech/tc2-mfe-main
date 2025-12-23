import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTransacao } from './grafico-transacao';

describe('GraficoTransacao', () => {
  let component: GraficoTransacao;
  let fixture: ComponentFixture<GraficoTransacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficoTransacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoTransacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
