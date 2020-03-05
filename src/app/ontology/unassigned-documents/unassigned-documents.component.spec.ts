import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedDocumentsComponent } from './unassigned-documents.component';

describe('UnassignedDocumentsComponent', () => {
  let component: UnassignedDocumentsComponent;
  let fixture: ComponentFixture<UnassignedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
