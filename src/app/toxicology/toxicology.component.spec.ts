import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicologyComponent } from './toxicology.component';

describe('ToxicologyComponent', () => {
  let component: ToxicologyComponent;
  let fixture: ComponentFixture<ToxicologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToxicologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
