import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaConversacionComponent } from './nueva-conversacion.component';

describe('NuevaConversacionComponent', () => {
  let component: NuevaConversacionComponent;
  let fixture: ComponentFixture<NuevaConversacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaConversacionComponent]
    });
    fixture = TestBed.createComponent(NuevaConversacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
