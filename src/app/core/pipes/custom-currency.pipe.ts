import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {

  private currencyPipe = inject(CurrencyPipe);

  transform(value: string): string {
    if (!value) return '';

    const numericValue = parseFloat(value.toString());

    if (isNaN(numericValue)) return '';

    let formattedValue = this.currencyPipe.transform(numericValue, 'USD', 'symbol', '1.0-0') + ' million';

    return formattedValue ?? '';
  }

}
