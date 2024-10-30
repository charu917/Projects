import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedScholarshipListComponent } from './applied-scholarship-list.component';

describe('AppliedScholarshipListComponent', () => {
  let component: AppliedScholarshipListComponent;
  let fixture: ComponentFixture<AppliedScholarshipListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedScholarshipListComponent]
    });
    fixture = TestBed.createComponent(AppliedScholarshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
