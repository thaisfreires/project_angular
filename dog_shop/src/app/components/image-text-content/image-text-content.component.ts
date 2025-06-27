import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-image-text-content',
  imports: [],
  templateUrl: './image-text-content.component.html',
  styleUrl: './image-text-content.component.scss'
})
export class ImageTextContentComponent {

  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
