import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTitle',
})
export class FormatTitlePipe implements PipeTransform {
  transform(title: string): string {
    let arr = title.split('-');
    arr.forEach((val, index) => {
      arr[index] = val.charAt(0).toUpperCase() + val.slice(1);
    });
    return arr.join(' ');
  }
}
