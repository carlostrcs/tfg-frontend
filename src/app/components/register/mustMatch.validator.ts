import { AbstractControl, ValidationErrors } from "@angular/forms";

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
  
      // Si el matchingControl no está definido, no se valida
      if (!matchingControl) {
        return null;
      }
  
      // Si el valor no ha cambiado, no es necesario validar
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }
  
      // Establecer un error si los valores no son iguales
      if (control?.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        // Si son iguales, eliminar el error
        matchingControl.setErrors(null);
      }
  
      return null;
    };
  }