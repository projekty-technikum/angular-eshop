import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  standalone: false,

  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent {
  @Output()
  filterChanged = new EventEmitter<string>();

  categories = [
    { id: 'all', name: 'All Products' },
    { id: 'phone', name: 'Phones' },
    { id: 'laptop', name: 'Laptops' },
    { id: 'tablet', name: 'Tablets' },
    { id: 'wearable', name: 'Wearables' },
    { id: 'accessories', name: 'Accessories' },
  ];

  onFilterSelect(category: string) {
    this.filterChanged.emit(category);
  }
}
