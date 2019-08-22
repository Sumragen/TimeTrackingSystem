import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeInputComponent } from './type-input.component';

describe('TypeInputComponent', () => {
  let component: TypeInputComponent;
  let fixture: ComponentFixture<TypeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypeInputComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
