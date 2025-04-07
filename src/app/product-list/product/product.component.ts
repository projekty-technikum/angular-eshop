import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  // Wartość wejściowa do odbierania danych produktu z komponentu nadrzędnego
  @Input()
  product: any;

  // Wartość wejściowa do śledzenia, czy produkt znajduje się na liście porównawczej
  @Input()
  isInCompareList: boolean = false;

  // Emiter zdarzeń wyjściowych powiadamiający element nadrzędny, gdy użytkownik chce porównać ten produkt.
  @Output()
  addToCompare = new EventEmitter<any>();

  // Właściwość kontrolująca widoczność szczegółów produktu
  showDetails: boolean = false;

  // Odniesienie do elementu kontenera produktu
  @ViewChild('productContainer') productContainer!: ElementRef;

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
    // Powiadom element nadrzędny, że ten produkt powinien zostać dodany/usunięty z porównania
    this.addToCompare.emit(this.product);
  }
}
