import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../components/button/button.component";
import { ImageTextContentComponent } from '../../components/image-text-content/image-text-content.component';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, ButtonComponent, ImageTextContentComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  showAlert=false;

  contact: {} = {
    name: '',
    message: '',
    subject: [],
    email: ''
  };

  subject: Array<string> = [
    'Feedback',
    'Return',
    'Complaint', 
    'Other'
  ];
  
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    message: new FormControl(''),
    subject: new FormControl([]),
    email: new FormControl('')
  });
  resetForm(){
    this.form.reset();
  }
  showMetadata(){
    this.showAlert=true;
  }
  closeAlert(){
    this.showAlert=false;
  }
}


