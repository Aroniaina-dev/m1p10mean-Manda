import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparerVoitureComponent } from './reparer-voiture.component';

describe('ReparerVoitureComponent', () => {
  let component: ReparerVoitureComponent;
  let fixture: ComponentFixture<ReparerVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReparerVoitureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReparerVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
