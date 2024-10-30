import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipsDisplayComponent } from './scholarships-display.component';

describe('ScholarshipsDisplayComponent', () => {
  let component: ScholarshipsDisplayComponent;
  let fixture: ComponentFixture<ScholarshipsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScholarshipsDisplayComponent]
    });
    fixture = TestBed.createComponent(ScholarshipsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
