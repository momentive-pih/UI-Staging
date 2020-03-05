import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesVolumeComponent } from './sales-volume.component';

describe('SalesVolumeComponent', () => {
  let component: SalesVolumeComponent;
  let fixture: ComponentFixture<SalesVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
