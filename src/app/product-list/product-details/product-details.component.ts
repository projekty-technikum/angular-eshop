import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-details',
  standalone: false,

  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  @Input() product: any;
  @Input() showDetails: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  getDiscountedPrice(product: any) {
    return product.price - (product.price * product.discount) / 100;
  }

  onClose() {
    this.closeModal.emit();
  }
}
