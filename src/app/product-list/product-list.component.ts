import { Component } from '@angular/core';

@Component({
  selector: 'product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  cartCount: number = 0;
  inCart: number = 0;
  name: string = 'Kacper';
  product = {
    name: 'iPhone 15',
    price: 999,
    color: 'Pink',
    discount: 10,
    inStock: 5,
    pImage: 'iphone15.jpg',
  };

  getDiscountedPrice() {
    return (
      this.product.price - (this.product.price * this.product.discount) / 100
    );
  }

  incrementCart() {
    if (this.cartCount < this.product.inStock) {
      this.cartCount++;
    }
  }

  decrementCart() {
    if (this.cartCount > 0) {
      this.cartCount--;
    }
  }
}
