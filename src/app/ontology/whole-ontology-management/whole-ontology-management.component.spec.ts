import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeOntologyManagementComponent } from './whole-ontology-management.component';

describe('WholeOntologyManagementComponent', () => {
  let component: WholeOntologyManagementComponent;
  let fixture: ComponentFixture<WholeOntologyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholeOntologyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholeOntologyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
