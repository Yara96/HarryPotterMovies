import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(duration: string): string {
    if (!duration) {
      return '';
    }

    const durationInMinutes = parseInt(duration);

    if (isNaN(durationInMinutes)) {
      return '';
    }

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours}h ${minutes}min`;
  }
}
