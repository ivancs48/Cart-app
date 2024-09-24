import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  constructor(
    private router: Router,
    private SharingDataService: SharingDataService, 
    private service: ProductService) {}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() {
    this.SharingDataService.productsEventEmitter.subscribe(product => {
      const hasItems = this.items.find((item) => {
        return item.product.id === product.id;
      });
      if (hasItems) {
        this.items = this.items.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        this.items = [...this.items, { product: { ...product }, quantity: 1 }];
      }
      
      this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'], {
        state: { items: this.items, total:this.total}
      });
    })
    
  }

  onDeleteCart(): void {
    this.SharingDataService.idProductProductEmitter.subscribe(id => {
      console.log(id + ' se ha ejecutado el evento idProductEventEmitter');
      this.items = this.items.filter((item) => item.product.id !== id);
      if (this.items.length == 0) {
        sessionStorage.removeItem('cart');
        sessionStorage.clear();
      }
      this.calculateTotal();
      this.saveSession(); 

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/cart'], {
          state: { items: this.items, total:this.total}
        })
      })
      
    })
  }

  calculateTotal(): void {
    this.total = this.items.reduce((total, item) => 
    total + item.product.price * item.quantity, 0);
  }

  saveSession(): void{
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCloseCart(): void {
    this.showCart = !this.showCart;
  }
}
