import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header-basic',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './header-basic.component.html',
  styleUrl: './header-basic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBasicComponent {
  @HostBinding('class') hostClass =
    'fixed py-4 top-0 z-10 left-0 right-0 flex items-stretch shrink-0 bg-[#fefefe] dark:bg-coal-500 shadow-sm dark:border-b dark:border-b-coal-100';
  @HostBinding('attr.role') hostRole = 'banner';
  @HostBinding('attr.data-sticky') dataSticky = 'true';
  @HostBinding('attr.data-sticky-name') dataStickyName = 'header';
  @HostBinding('id') hostId = 'header';

  public menuItems: any[] = [
    {
      titulo: 'Perfil',
      icono: 'ki-filled ki-user',
      link: '/perfil',
    },
  ];
}
