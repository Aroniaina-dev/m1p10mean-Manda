import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMaterielComponent } from './ajout-materiel.component';

describe('AjoutMaterielComponent', () => {
  let component: AjoutMaterielComponent;
  let fixture: ComponentFixture<AjoutMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutMaterielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
