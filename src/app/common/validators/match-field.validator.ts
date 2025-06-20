import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador personalizado que verifica si dos campos tienen el mismo valor
 * @param controlName Nombre del primer control a comparar
 * @param matchingControlName Nombre del segundo control que debe coincidir con el primero
 * @returns Una función validadora que devuelve null si los campos coinciden o un objeto de error si no coinciden
 */
export function matchFieldsValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    // Si alguno de los controles no existe o no tiene valor, no validamos
    if (!control || !matchingControl || !control.value || !matchingControl.value) {
      return null;
    }

    // Verificamos si los valores son iguales
    if (control.value !== matchingControl.value) {
      // Añadimos el error al segundo control (el de confirmación)
      matchingControl.setErrors({
        ...matchingControl.errors,
        notMatching: true,
      });
      return { notMatching: true };
    }

    // Si los valores coinciden pero el control de confirmación tenía el error notMatching,
    // eliminamos ese error específico manteniendo otros errores si existen
    if (matchingControl.errors && matchingControl.errors['notMatching']) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { notMatching: _, ...otherErrors } = matchingControl.errors;
      matchingControl.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
    }

    return null;
  };
}
