import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: false,

  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input()
  product: any;

  getDiscountedPrice(product: any) {
    return product.price - (product.price * product.discount) / 100;
  }

  incrementCart(product: any) {
    if (product.cartCount < product.inStock) {
      product.cartCount++;
    }
  }

  decrementCart(product: any) {
    if (product.cartCount > 0) {
      product.cartCount--;
    }
  }
}
