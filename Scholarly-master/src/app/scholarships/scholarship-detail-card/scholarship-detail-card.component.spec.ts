import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipDetailCardComponent } from './scholarship-detail-card.component';

describe('ScholarshipDetailCardComponent', () => {
  let component: ScholarshipDetailCardComponent;
  let fixture: ComponentFixture<ScholarshipDetailCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScholarshipDetailCardComponent]
    });
    fixture = TestBed.createComponent(ScholarshipDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
