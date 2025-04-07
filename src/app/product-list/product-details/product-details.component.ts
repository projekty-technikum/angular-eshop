// Import Angular core features needed for component development
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  // Właściwość wejściowa do odbierania danych produktu z komponentu nadrzędnego
  @Input() product: any;

  // Właściwość wejściowa kontrolująca widoczność tego komponentu
  // Domyślnie jest to false (ukryty)
  @Input() showDetails: boolean = false;

  // Emiter zdarzeń wyjściowych powiadamiający rodzica, gdy użytkownik zamknie okno szczegółów
  @Output() closeModal = new EventEmitter<void>();

  getDiscountedPrice(product: any) {
    return product.price - (product.price * product.discount) / 100;
  }

  onClose() {
    this.closeModal.emit();
  }
}
