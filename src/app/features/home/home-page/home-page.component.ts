import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { ModalService } from '../../../core/services/modal.service';
import { LoginModalComponent } from '../components/login-modal/login-modal.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ CommonModule, RouterModule, LoginModalComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {
  showLoginModal = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: SpinnerService,
    private modalService: ModalService 
  ) {}

  toggleLogin() {
    this.showLoginModal = !this.showLoginModal;
  }

    async handleLogin({ email, password }: { email: string; password: string }) {
      this.spinner.show();
    
      try {
        const user: User = await this.authService.login(email, password);
        await this.router.navigate(['/dashboard']);
      } catch (error: any) {
        const message = error?.message || 'Error al iniciar sesión.';
    
        this.modalService.show({
          message,
          isError: true,
          show: true,
          showButtons: false,
          close: () => {},
        });
      } finally {
        this.spinner.hide();
      }
    }
}
