import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCommunicationComponent } from './customer-communication.component';

describe('CustomerCommunicationComponent', () => {
  let component: CustomerCommunicationComponent;
  let fixture: ComponentFixture<CustomerCommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCommunicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
