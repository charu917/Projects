import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualScholarshipDetailsComponent } from './individual-scholarship-details.component';

describe('IndividualScholarshipDetailsComponent', () => {
  let component: IndividualScholarshipDetailsComponent;
  let fixture: ComponentFixture<IndividualScholarshipDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualScholarshipDetailsComponent]
    });
    fixture = TestBed.createComponent(IndividualScholarshipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
