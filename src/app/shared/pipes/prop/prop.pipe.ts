import { Pipe, PipeTransform } from '@angular/core';
import { isArray } from 'util';
import { prop } from 'ramda';

@Pipe({
  name: 'prop'
})
export class PropPipe implements PipeTransform {

  transform(value: any, property: string): any {
    return isArray(value) ? value.map(prop(property)) : value[property];
  }

}
