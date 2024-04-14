import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boxOffice',
  standalone: true,
})
export class BoxOfficePipe implements PipeTransform {
  transform(value: string): string {
    // Remove commas and convert the string to a number
    const numericValue = parseFloat(value.replace(/,/g, ''));

    if (isNaN(numericValue)) {
      // Return original value if it's not a valid number
      return value;
    }

    // Format the number to the desired currency format
    const formattedValue = numericValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    // Append 'million' to the formatted value
    return formattedValue + ' million';
  }
}
