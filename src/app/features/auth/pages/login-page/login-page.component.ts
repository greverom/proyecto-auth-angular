import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../../shared/models/user.model';
import { ModalDto, modalInitializer } from '../../../../shared/modal/modal.dto';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { SpinnerComponent } from '../../../../shared/spinner/spinner.component';
import { SpinnerService } from '../../../../core/services/spinner.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LoginFormComponent,
    ModalComponent],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  modal: ModalDto = modalInitializer();
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  async handleLogin({ email, password }: { email: string; password: string }) {
    this.spinner.show();
  
    try {
      const user: User = await this.authService.login(email, password);
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      this.showModal(this.createModalParams(true, 'Error al iniciar sesión'));
    } finally {
      this.spinner.hide();
    }
  }

  showModal(params: ModalDto) {
    this.modal = { ...params };
  
    setTimeout(() => {
      this.modal.close();
    }, 2500);
  }
  
  createModalParams(isError: boolean, message: string): ModalDto {
    return {
      ...this.modal,
      show: true,
      isError,
      isSuccess: !isError,
      message,
      close: () => this.closeModal()
    };
  }
  
  closeModal() {
    this.modal.show = false;
  }
}