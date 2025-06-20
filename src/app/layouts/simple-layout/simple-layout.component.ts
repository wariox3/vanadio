import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchModalComponent } from '../../partials/search-modal/search-modal.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderBasicComponent } from '../header-basic/header-basic.component';

@Component({
  selector: 'app-contenedor-layout',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, SearchModalComponent, HeaderBasicComponent],
  templateUrl: './simple-layout.component.html',
  styleUrl: './simple-layout.component.scss',
})
export default class ContenedorLayoutComponent {}
