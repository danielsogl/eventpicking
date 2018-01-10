import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
  pure: true
})
export class ReplacePipe implements PipeTransform {
  transform(item: any, replace, replacement): any {
    if (item == null) {
      return '';
    }
    item = item.replace(replace, replacement);
    return item;
  }
}
