import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitEllipsis',
  standalone: true,
})
export class LimitEllipsisPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (!value) return '';
    if (value.length > limit) {
      return value.substring(0, limit) + '...';
    }
    return value;
  }
}
