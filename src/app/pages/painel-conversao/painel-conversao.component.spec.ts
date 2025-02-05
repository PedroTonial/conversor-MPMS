import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelConversaoComponent } from './painel-conversao.component';

describe('PainelConversaoComponent', () => {
  let component: PainelConversaoComponent;
  let fixture: ComponentFixture<PainelConversaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelConversaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelConversaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
