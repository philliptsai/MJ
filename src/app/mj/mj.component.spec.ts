import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { MjComponent } from './mj.component';

describe('MjComponent', () => {
  let component: MjComponent;
  let fixture: ComponentFixture<MjComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MjComponent ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MjComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create mj component', () => {
    expect(component).toBeTruthy();
  });
});
