import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedDetailsDocumentsComponent } from './unassigned-details-documents.component';

describe('UnassignedDetailsDocumentsComponent', () => {
  let component: UnassignedDetailsDocumentsComponent;
  let fixture: ComponentFixture<UnassignedDetailsDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedDetailsDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedDetailsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
