import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph01Component } from './graph01.component';

describe('Graph01Component', () => {
  let component: Graph01Component;
  let fixture: ComponentFixture<Graph01Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Graph01Component]
    });
    fixture = TestBed.createComponent(Graph01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
