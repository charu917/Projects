import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftOptionsComponent } from './left-options.component';

describe('LeftOptionsComponent', () => {
  let component: LeftOptionsComponent;
  let fixture: ComponentFixture<LeftOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftOptionsComponent]
    });
    fixture = TestBed.createComponent(LeftOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
