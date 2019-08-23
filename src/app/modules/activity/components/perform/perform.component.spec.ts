import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformComponent } from './perform.component';

describe('PerformComponent', () => {
  let component: PerformComponent;
  let fixture: ComponentFixture<PerformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
