import { Component } from '@angular/core';

@Component({
  selector: 'product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  name: string = 'Kacper';
  product = {
    name: 'iPhone',
    price: 799,
    color: 'Black',
    discount: 8.5,
    inStock: 5,
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
}
