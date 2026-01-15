import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaExtrato } from './lista-extrato';

describe('ListaExtrato', () => {
  let component: ListaExtrato;
  let fixture: ComponentFixture<ListaExtrato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaExtrato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaExtrato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
