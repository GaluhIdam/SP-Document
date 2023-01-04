import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpdocumentComponent } from './edit-spdocument.component';

describe('EditSpdocumentComponent', () => {
  let component: EditSpdocumentComponent;
  let fixture: ComponentFixture<EditSpdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpdocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
