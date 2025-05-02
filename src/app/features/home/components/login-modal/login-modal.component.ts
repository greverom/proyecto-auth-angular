
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  template: `
    <div class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" *ngIf="visible">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-800" (click)="close.emit()">
          ✕
        </button>
        <app-login-form (loginSubmitted)="onLogin($event)"></app-login-form>
      </div>
    </div>
  `,
})
export class LoginModalComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() login = new EventEmitter<{ email: string; password: string }>();

  onLogin(data: { email: string; password: string }) {
    this.login.emit(data);
  }
}