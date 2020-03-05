import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyDocumentsComponent } from './ontology-documents.component';

describe('OntologyDocumentsComponent', () => {
  let component: OntologyDocumentsComponent;
  let fixture: ComponentFixture<OntologyDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntologyDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
