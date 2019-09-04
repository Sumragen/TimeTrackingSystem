import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  constructor() {}

  public static g: (length?: number) => number = (l = 8) =>
    Math.floor(Math.random() * Math.pow(10, l));
}
