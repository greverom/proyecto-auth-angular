import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, LoginFormComponent, RegisterFormComponent],
  template: `
    <div class="fixed inset-0 backdrop-blur-sm overflow-y-auto flex items-center justify-center z-50" *ngIf="visible">
    <div class="bg-white rounded-md shadow-md w-full max-w-[340px] sm:max-w-[370px] mx-4 sm:mx-0 relative max-h-[90vh] overflow-y-auto">
        <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-800" (click)="close.emit()">✕</button>

        <ng-container *ngIf="isLoginMode; else registerBlock">
          <app-login-form (loginSubmitted)="onLogin($event)"></app-login-form>
          <p class="text-xs text-center text-gray-600 mb-4">
            ¿No tienes cuenta?
            <span (click)="isLoginMode = false" class="text-blue-600 hover:underline cursor-pointer">Regístrate</span>
          </p>
        </ng-container>

        <ng-template #registerBlock>
          <app-register-form (registerSubmitted)="onRegister($event)"></app-register-form>
          <p class="text-xs text-center text-gray-600 mb-4">
            ¿Ya tienes cuenta?
            <span (click)="isLoginMode = true" class="text-blue-600 hover:underline cursor-pointer">Inicia sesión</span>
          </p>
        </ng-template>
      </div>
    </div>
  `
})

export class AuthModalComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() login = new EventEmitter<{ email: string; password: string }>();
  @Output() register = new EventEmitter<{ name: string; email: string; password: string; role: string }>();

  isLoginMode = true;

  onLogin(data: { email: string; password: string }) {
    this.login.emit(data);
  }

  onRegister(data: { name: string; email: string; password: string; role: string }) {
    this.register.emit(data);
  }
}