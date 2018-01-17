import { Pipe, PipeTransform } from '@angular/core';

/**
 * Replace string pipe
 * @author Daniel Sogl, Tim Kriessler
 */
@Pipe({
  name: 'replace',
  pure: true
})
export class ReplacePipe implements PipeTransform {
  transform(item: any, replace: any, replacement: any): any {
    if (item == null) {
      return '';
    }
    item = item.replace(replace, replacement);
    return item;
  }
}
