import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageindexComponent } from './pageindex.component';

describe('PageindexComponent', () => {
  let component: PageindexComponent;
  let fixture: ComponentFixture<PageindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
