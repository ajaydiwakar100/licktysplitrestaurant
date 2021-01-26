import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouponeComponent } from './add-coupone.component';

describe('AddCouponeComponent', () => {
  let component: AddCouponeComponent;
  let fixture: ComponentFixture<AddCouponeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCouponeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCouponeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
