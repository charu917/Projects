import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipCardComponent } from './scholarship-card.component';

describe('ScholarshipCardComponent', () => {
  let component: ScholarshipCardComponent;
  let fixture: ComponentFixture<ScholarshipCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScholarshipCardComponent]
    });
    fixture = TestBed.createComponent(ScholarshipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
