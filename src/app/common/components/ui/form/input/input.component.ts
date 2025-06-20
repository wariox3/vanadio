// src/app/shared/ui/input/input.component.ts
import { NgIf } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIf],
  template: `
    <div>
      <label *ngIf="label" class="block text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <input
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        [disabled]="disabled"
        class="input"
      />
      @if (shouldShowErrors()) {
        @for (error of getErrors(); track $index) {
          <p class="text-sm text-red-600 mt-1">
            {{ error }}
          </p>
        }
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = ''; // Etiqueta del input
  @Input() placeholder: string = ''; // Placeholder
  @Input() type: string = 'text'; // Tipo de input (text, email, password, etc.)
  @Input() errors: { [key: string]: string } = {}; // Mapa de errores personalizados
  @Input() disabled: boolean = false;

  @Input() invalid: boolean | undefined = false;
  @Input() dirty: boolean | undefined = false;
  @Input() touched: boolean | undefined = false;
  @Input() control: AbstractControl | null = null; // Nuevo input para recibir el control del formulario

  value: string = ''; // Valor interno del input
  onChange: any = () => {}; // Función para notificar cambios
  onTouched: any = () => {}; // Función para notificar que el input fue tocado

  // Escribe el valor en el input
  writeValue(value: any): void {
    this.value = value || '';
  }

  // Registra la función para notificar cambios
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registra la función para notificar que el input fue tocado
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Maneja el evento de entrada
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value); // Notifica el cambio
    this.dirty = true; // Marca el control como "sucio"
  }

  // Maneja el evento de blur
  onBlur(): void {
    this.onTouched(); // Notifica que el input fue tocado
  }

  // Determina si se deben mostrar los errores
  shouldShowErrors(): boolean {
    // Si tenemos acceso al control, usamos sus propiedades
    if (this.control) {
      return this.control.invalid && (this.control.dirty || this.control.touched);
    }
    // Si no, usamos las propiedades pasadas directamente
    return this.invalid === true && (this.dirty === true || this.touched === true);
  }

  // Obtiene los mensajes de error
  getErrors(): string[] {
    if (!this.errors) return [];

    // Si tenemos acceso al control, verificamos qué errores específicos están ocurriendo
    if (this.control && this.control.errors) {
      const activeErrors: string[] = [];

      // Recorremos las claves de los errores del control
      Object.keys(this.control.errors).forEach(errorKey => {
        // Convertimos el errorKey a camelCase si es necesario (minlength -> minLength)
        const normalizedKey = this.normalizeErrorKey(errorKey);

        // Si tenemos un mensaje para este error, lo añadimos
        if (this.errors[normalizedKey]) {
          activeErrors.push(this.errors[normalizedKey]);
        }
      });

      return activeErrors;
    }

    return [];
  }

  // Normaliza las claves de error (convierte minlength a minLength, etc.)
  private normalizeErrorKey(key: string): string {
    // Mapa de conversiones comunes
    const keyMap: { [key: string]: string } = {
      minlength: 'minLength',
      maxlength: 'maxLength',
      required: 'required',
      pattern: 'pattern',
      email: 'email',
    };

    return keyMap[key] || key;
  }

  // Método para actualizar el estado de validación
  setInvalidState(isInvalid: boolean): void {
    this.invalid = isInvalid;
  }
}
