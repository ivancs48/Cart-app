import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  
  products: Product[] = [];

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.findAll();
  }

}
