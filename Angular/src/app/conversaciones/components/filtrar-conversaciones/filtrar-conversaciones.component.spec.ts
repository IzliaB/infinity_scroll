/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FiltrarConversacionesComponent } from './filtrar-conversaciones.component';

describe('FiltrarConversacionesComponent', () => {
  let component: FiltrarConversacionesComponent;
  let fixture: ComponentFixture<FiltrarConversacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrarConversacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarConversacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
