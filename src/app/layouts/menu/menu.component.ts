import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { logout } from '@app/modules/auth/store/actions/login.action';
import { Store } from '@ngrx/store';
import { ProfileImageService } from '@app/core/services/profile-image.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  @Input({ required: true }) titulo: string;
  @Input() subtitulo: string;
  @Input({ required: true }) menuItems: any[];
  @Input() imagen: string;

  private store = inject(Store);
  private profileImageService = inject(ProfileImageService);

  // Use the service's profileImageUrl signal
  protected profileImageUrl = this.profileImageService.profileImageUrl;

  cerrarSesion() {
    this.store.dispatch(logout());
  }
}
