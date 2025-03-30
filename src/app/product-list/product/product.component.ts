import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product: any;
  @Input() isInCompareList: boolean = false;
  @Output() addToCompare = new EventEmitter<any>();

  showDetails: boolean = false;

  getDiscountedPrice(product: any) {
    return product.price - (product.price * product.discount) / 100;
  }

  incrementCart(product: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (product.cartCount < product.inStock) {
      product.cartCount++;
    }
  }

  decrementCart(product: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (product.cartCount > 0) {
      product.cartCount--;
    }
  }

  toggleDetails(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showDetails = !this.showDetails;
  }

  compareProduct(event: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.addToCompare.emit(this.product);
  }
}
