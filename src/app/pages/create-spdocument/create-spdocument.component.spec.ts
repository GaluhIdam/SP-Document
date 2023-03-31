import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpdocumentComponent } from './create-spdocument.component';

describe('CreateSpdocumentComponent', () => {
  let component: CreateSpdocumentComponent;
  let fixture: ComponentFixture<CreateSpdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSpdocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSpdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
