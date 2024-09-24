import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idProductProductEmitter: EventEmitter<number> = new EventEmitter();
  private _productsEventEmitter: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  get idProductProductEmitter(): EventEmitter<number> {
    return this._idProductProductEmitter;
  }

  get productsEventEmitter():EventEmitter<Product> {
    return this._productsEventEmitter;
  }

}
