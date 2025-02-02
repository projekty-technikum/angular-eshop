import { Component } from '@angular/core';

@Component({
  selector: 'product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  name: string = 'John';
  addToCart: number = 0;
  product = {
    name: 'iPhone 15',
    price: 799,
    color: 'Black',
    discount: 8.5,
    inStock: 4,
    pImage: 'iphone15.jpg',
  };

  getDiscountedPrice() {
    return (
      this.product.price - (this.product.price * this.product.discount) / 100
    );
  }

  onNameChange(event: any) {
    console.log(event.target.value);
  }

  incrementCart() {
    this.addToCart++;
  }

  decrementCart() {
    if (this.addToCart > 0) {
      this.addToCart--;
    }
  }
}
