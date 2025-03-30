import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  isHovered = false;
  selectedFilterOption: string = 'all';
  searchQuery: string = '';

  // Track selected products for comparison
  productsToCompare: any[] = [];
  compareMode: boolean = false;

  // Add ViewChild for the compare button
  @ViewChild('compareButton') compareButton!: ElementRef;

  // Add ViewChildren for all products
  @ViewChildren('productItem') productItems!: QueryList<ProductComponent>;

  products: any[] = [
    {
      name: 'iPhone 15',
      price: 999,
      color: 'Pink',
      pImage: 'iphone15.jpg',
      inStock: 12,
      discount: 10,
      cartCount: 0,
      category: 'phone',
    },
    {
      name: 'iPhone 14',
      price: 799,
      color: 'Purple',
      pImage: 'iphone14.jpg',
      inStock: 7,
      discount: 15,
      cartCount: 0,
      category: 'phone',
    },
    {
      name: 'iPhone 13',
      price: 699,
      color: 'Black',
      pImage: 'iphone13.jpg',
      inStock: 0,
      discount: 20,
      cartCount: 0,
      category: 'phone',
    },
    {
      name: 'MacBook Pro 16"',
      price: 2499,
      color: 'Space Gray',
      pImage: 'macbook.png',
      inStock: 5,
      discount: 5,
      cartCount: 0,
      category: 'laptop',
    },
    {
      name: 'iPad Pro 12.9"',
      price: 1099,
      color: 'Silver',
      pImage: 'ipad.png',
      inStock: 15,
      discount: 8,
      cartCount: 0,
      category: 'tablet',
    },
    {
      name: 'AirPods Pro',
      price: 249,
      color: 'White',
      pImage: 'airpods.png',
      inStock: 30,
      discount: 20,
      cartCount: 0,
      category: 'accessories',
    },
    {
      name: 'Apple Watch Series 9',
      price: 399,
      color: 'Midnight',
      pImage: 'applewatch.png',
      inStock: 12,
      discount: 0,
      cartCount: 0,
      category: 'wearable',
    },
  ];

  get filteredProducts() {
    let filtered = this.products;

    if (this.selectedFilterOption !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === this.selectedFilterOption
      );
    }

    if (this.searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    return filtered;
  }

  onFilterChange(category: string) {
    this.selectedFilterOption = category;
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
  }

  handleCompareProduct(product: any) {
    const index = this.productsToCompare.findIndex(
      (p) => p.name === product.name
    );

    if (index !== -1) {
      this.productsToCompare.splice(index, 1);
    } else {
      if (this.productsToCompare.length < 3) {
        this.productsToCompare.push(product);
      } else {
        alert('You can compare maximum 3 products at once');
      }
    }

    // Use ViewChild to update button text with count
    if (this.compareButton) {
      this.compareButton.nativeElement.textContent = `Compare Selected (${this.productsToCompare.length})`;
    }
  }

  isProductInCompareList(product: any): boolean {
    return this.productsToCompare.some((p) => p.name === product.name);
  }

  startComparison() {
    if (this.productsToCompare.length < 2) {
      alert('Please select at least 2 products to compare');
      return;
    }

    this.compareMode = true;

    // Use ViewChildren to highlight products for comparison
    this.highlightComparedProducts();
  }

  // A simple method to highlight compared products using ViewChildren
  highlightComparedProducts() {
    if (this.productItems) {
      this.productItems.forEach((item) => {
        const isInCompare = this.isProductInCompareList(item.product);
        const element = item['elementRef']?.nativeElement;

        if (element) {
          if (isInCompare) {
            element.style.transform = 'scale(1.05)';
            element.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.7)';
          } else {
            element.style.transform = 'scale(1)';
            element.style.boxShadow = 'none';
          }
        }
      });
    }
  }

  cancelComparison() {
    this.compareMode = false;
    this.productsToCompare = [];

    // Reset highlights when cancelling comparison
    if (this.productItems) {
      this.productItems.forEach((item) => {
        const element = item['elementRef']?.nativeElement;
        if (element) {
          element.style.transform = 'scale(1)';
          element.style.boxShadow = 'none';
        }
      });
    }

    // Use ViewChild to update button
    if (this.compareButton) {
      this.compareButton.nativeElement.textContent = 'Compare Selected (0)';
    }
  }

  getComparisonData() {
    return this.productsToCompare.map((product) => ({
      name: product.name,
      price: product.price,
      discountedPrice: product.price - (product.price * product.discount) / 100,
      color: product.color,
      inStock: product.inStock,
      category: product.category,
    }));
  }
}
