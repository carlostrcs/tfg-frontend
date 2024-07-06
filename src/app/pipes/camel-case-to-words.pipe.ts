import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToWords',
  standalone: true
})
export class CamelCaseToWordsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      .replace(/^[a-z]/, char => char.toUpperCase());
  }


}
