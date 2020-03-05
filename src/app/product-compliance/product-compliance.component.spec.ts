import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComplianceComponent } from './product-compliance.component';

describe('ProductComplianceComponent', () => {
  let component: ProductComplianceComponent;
  let fixture: ComponentFixture<ProductComplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
