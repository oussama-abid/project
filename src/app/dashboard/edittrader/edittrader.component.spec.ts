import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittraderComponent } from './edittrader.component';

describe('EdittraderComponent', () => {
  let component: EdittraderComponent;
  let fixture: ComponentFixture<EdittraderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdittraderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdittraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
