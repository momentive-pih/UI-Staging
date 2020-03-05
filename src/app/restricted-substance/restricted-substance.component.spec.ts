import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedSubstanceComponent } from './restricted-substance.component';

describe('RestrictedSubstanceComponent', () => {
  let component: RestrictedSubstanceComponent;
  let fixture: ComponentFixture<RestrictedSubstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedSubstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedSubstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
