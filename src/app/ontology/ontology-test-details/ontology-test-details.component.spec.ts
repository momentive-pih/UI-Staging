import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyTestDetailsComponent } from './ontology-test-details.component';

describe('OntologyTestDetailsComponent', () => {
  let component: OntologyTestDetailsComponent;
  let fixture: ComponentFixture<OntologyTestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntologyTestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyTestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
