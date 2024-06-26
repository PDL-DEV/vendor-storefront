import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressQueryBarComponent } from './progress-query-bar.component';

describe('ProgressQueryBarComponent', () => {
  let component: ProgressQueryBarComponent;
  let fixture: ComponentFixture<ProgressQueryBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressQueryBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressQueryBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
