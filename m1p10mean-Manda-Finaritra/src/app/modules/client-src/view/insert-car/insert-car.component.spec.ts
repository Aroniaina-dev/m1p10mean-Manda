import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCarComponent } from './insert-car.component';

describe('InsertCarComponent', () => {
  let component: InsertCarComponent;
  let fixture: ComponentFixture<InsertCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
