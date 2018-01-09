import { PipeTransform, Injectable, Pipe } from '@angular/core';
@Pipe({
  name: 'replace'
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
