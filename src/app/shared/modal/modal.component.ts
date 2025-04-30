import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input() message: string = 'An error occurred'; 
  @Input() isError: boolean = true;  
  @Input() isSuccess: boolean = false;  
  @Input() showButtons: boolean = false;
  @Input() isInfo: boolean = false;  
  @Output() close = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<void>();

  confirm() {
    this.confirmAction.emit(); 
  }
  
  closeModal() {
    this.showModal = false;
    this.close.emit();  
  }
}
