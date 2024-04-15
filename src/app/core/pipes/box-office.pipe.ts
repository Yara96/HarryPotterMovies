import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boxOffice',
  standalone: true,
})
export class BoxOfficePipe implements PipeTransform {
  transform(value: string): string {
    const numericValue = parseFloat(value.replace(/,/g, ''));

    if (isNaN(numericValue)) {
      return '';
    }

    const formattedValue = numericValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });

    return formattedValue + ' million';
  }
}