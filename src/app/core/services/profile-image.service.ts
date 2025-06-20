import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '@app/modules/auth/store/selectors/auth.selector';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProfileImageService {
  private store = inject(Store);

  // Get the current user from the store as a signal
  private user = toSignal(this.store.select(selectCurrentUser));

  // Cache busting timestamp for image
  private cacheBustingTimestamp = signal<number>(Date.now());

  // Temporary image for preview (before saving to backend)
  private tempImage = signal<string | null>(null);

  // Computed signal for the profile image URL with cache busting
  public profileImageUrl: Signal<string | null> = computed(() => {
    // If there's a temporary image being previewed, use that
    const tempImg = this.tempImage();
    if (tempImg) {
      return tempImg;
    }

    // Otherwise use the image from the user in the store
    const user = this.user();
    if (!user || !user.imagen) {
      return null;
    }

    const imageUrl = user.imagen;

    // If it's a default image or base64, return as is
    if (imageUrl.includes('defecto') || imageUrl.startsWith('data:')) {
      return imageUrl;
    }

    // Add cache busting parameter
    return `${imageUrl}?t=${this.cacheBustingTimestamp()}`;
  });

  /**
   * Updates the cache busting timestamp to force image refresh
   */
  public refreshImageCache(): void {
    this.cacheBustingTimestamp.set(Date.now());
  }

  /**
   * Sets a temporary profile image (for preview before saving to backend)
   * @param imageUrl The image URL or base64 string to set
   */
  public setTempProfileImage(imageUrl: string): void {
    this.tempImage.set(imageUrl);
    this.refreshImageCache();
  }

  /**
   * Clears the temporary profile image
   */
  public clearTempProfileImage(): void {
    this.tempImage.set(null);
    this.refreshImageCache();
  }
}
