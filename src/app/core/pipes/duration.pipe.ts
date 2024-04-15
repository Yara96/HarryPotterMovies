import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe created to format the duration value in hours and minutes.
 */
@Pipe({
  name: 'duration',
  standalone: true,
})

export class DurationPipe implements PipeTransform {
  transform(duration: string): string {
    if (!duration) {
      return '';
    }

    const durationInMinutes: number = parseInt(duration);

    if (isNaN(durationInMinutes)) {
      return '';
    }

    const hours: number = Math.floor(durationInMinutes / 60);
    const minutes: number = durationInMinutes % 60;

    return `${hours}h ${minutes}min`;
  }
}
