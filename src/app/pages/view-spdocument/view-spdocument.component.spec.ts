import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpdocumentComponent } from './view-spdocument.component';

describe('ViewSpdocumentComponent', () => {
  let component: ViewSpdocumentComponent;
  let fixture: ComponentFixture<ViewSpdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpdocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSpdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
