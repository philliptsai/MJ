import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MjComponent } from './mj.component';

describe('MjComponent', () => {
  let component: MjComponent;
  let fixture: ComponentFixture<MjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
