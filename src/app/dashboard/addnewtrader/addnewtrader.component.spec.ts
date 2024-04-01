import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewtraderComponent } from './addnewtrader.component';

describe('AddnewtraderComponent', () => {
  let component: AddnewtraderComponent;
  let fixture: ComponentFixture<AddnewtraderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddnewtraderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddnewtraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
