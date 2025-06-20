import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepository } from '../../repositories/auth.repository';
import { AdvancedButtonComponent } from '@app/common/components/ui/advanced-button/advanced-button.component';
import { InputComponent } from '@app/common/components/ui/form/input/input.component';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { AlertaService } from '@app/common/services/alerta.service';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdvancedButtonComponent, InputComponent],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RecoverPasswordComponent {
  private authRepository = inject(AuthRepository);
  private router = inject(Router);
  private alerta = inject(AlertaService);

  public isLoading = signal<boolean>(false);
  public formulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  sendPasswordRecovery() {
    this.isLoading.set(true);
    this.authRepository
      .recoverPassword(this.formulario.value.email)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(res => {
        if (res.verificacion) {
          this.alerta.mostrarExito(
            'Hemos enviado un enlace al correo electrónico para restablecer tu contraseña.',
            'Solicitud exitosa.'
          );
          this.router.navigate(['auth/login']);
        }
      });
  }
}
