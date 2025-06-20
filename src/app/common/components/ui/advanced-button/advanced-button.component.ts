import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-advanced-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advanced-button.component.html',
  styleUrl: './advanced-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedButtonComponent {
  @Input() text = '';
  @Input() loadingText = '';
  @Input() type: 'submit' | 'button' | 'reset' = 'button';
  @Input() color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() classes = '';
  @Input() isLoading = false;
  @Input() isDisabled = false;
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Input() iconOnly = false;
  @Input() rounded = false;
  @Input() outline = false;
  @Input() block = false;
  @Output() buttonClick: EventEmitter<void>;

  constructor() {
    this.buttonClick = new EventEmitter<void>();
  }

  handleClick() {
    this.buttonClick.emit();
  }
}
