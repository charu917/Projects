import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMainComponent } from './landing-main.component';

describe('LandingMainComponent', () => {
  let component: LandingMainComponent;
  let fixture: ComponentFixture<LandingMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingMainComponent]
    });
    fixture = TestBed.createComponent(LandingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
