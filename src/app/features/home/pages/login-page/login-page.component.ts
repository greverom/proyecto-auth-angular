import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../../shared/models/user.model';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { ModalService } from '../../../../core/services/modal.service'; 
import { ModalComponent } from '../../../../shared/modal/modal.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: SpinnerService,
    private modalService: ModalService 
  ) {}

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