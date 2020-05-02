import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyTestComponent } from './ontology-test.component';

describe('OntologyTestComponent', () => {
  let component: OntologyTestComponent;
  let fixture: ComponentFixture<OntologyTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntologyTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
