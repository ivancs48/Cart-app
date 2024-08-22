import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'card-model',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './card-model.component.html'
})
export class CardModelComponent {

  @Input() items: CartItem[] = [];
  @Input() total = 0;

  @Output() idProductProductEmitter  = new EventEmitter();
  @Output() openEventEmitter = new EventEmitter();

  onDeleteCart(id: number) {
    this.idProductProductEmitter.emit(id);
  }

  openCart(): void {
    this.openEventEmitter.emit();
  }
}
