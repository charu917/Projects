import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCustomComponent } from './navbar-custom.component';

describe('NavbarCustomComponent', () => {
  let component: NavbarCustomComponent;
  let fixture: ComponentFixture<NavbarCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarCustomComponent]
    });
    fixture = TestBed.createComponent(NavbarCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
