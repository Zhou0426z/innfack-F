import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EidtAccountComponent } from './eidt-account.component';

describe('EidtAccountComponent', () => {
  let component: EidtAccountComponent;
  let fixture: ComponentFixture<EidtAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EidtAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EidtAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
