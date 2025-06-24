import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTextContentComponent } from './image-text-content.component';

describe('ImageTextContentComponent', () => {
  let component: ImageTextContentComponent;
  let fixture: ComponentFixture<ImageTextContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageTextContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageTextContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
