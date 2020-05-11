import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTablesComponent } from './other-tables.component';

describe('OtherTablesComponent', () => {
  let component: OtherTablesComponent;
  let fixture: ComponentFixture<OtherTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
