import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyHomeComponent } from './ontology-home.component';

describe('OntologyHomeComponent', () => {
  let component: OntologyHomeComponent;
  let fixture: ComponentFixture<OntologyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntologyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
