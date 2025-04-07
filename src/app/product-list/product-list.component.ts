import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
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

  productsToCompare: any[] = [];
  compareMode: boolean = false;

  // Odniesienie do przycisku porównania
  @ViewChild('compareButton') compareButton!: ElementRef;

  // Odniesienia do wszystkich komponentów produktu
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

  // Getter, który zwraca przefiltrowane produkty w oparciu o bieżący filtr kategorii i zapytanie wyszukiwania
  get filteredProducts() {
    let filtered = this.products;

    // Zastosuj filtr kategorii, jeśli nie wyświetla wszystkich produktów
    if (this.selectedFilterOption !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === this.selectedFilterOption
      );
    }

    // Zastosuj filtr wyszukiwania, jeśli istnieje zapytanie
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

  // Obsługuje dodawanie lub usuwanie produktu z listy porównawczej
  handleCompareProduct(product: any) {
    const index = this.productsToCompare.findIndex(
      (p) => p.name === product.name
    );

    if (index !== -1) {
      // Produkt jest już na liście, usuń go
      this.productsToCompare.splice(index, 1);
    } else {
      // Dodaj produkt, jeśli lista porównawcza nie jest pełna (maks. 3)
      if (this.productsToCompare.length < 3) {
        this.productsToCompare.push(product);
      } else {
        alert('You can compare maximum 3 products at once');
      }
    }

    // Zaktualizuj tekst przycisku porównania, aby wyświetlić liczbę wybranych produktów
    if (this.compareButton) {
      this.compareButton.nativeElement.textContent = `Compare Selected (${this.productsToCompare.length})`;
    }
  }

  // Stosuje wizualne podświetlenie do produktów na liście porównawczej
  highlightComparedProduct() {
    if (this.productItems) {
      this.productItems.forEach((item) => {
        const isInCompare = this.isProductInCompareList(item.product);
        const element = item.productContainer?.nativeElement;

        if (element) {
          if (isInCompare) {
            // Zastosuj style wyróżnienia do produktów na liście porównawczej
            element.style.transform = 'scale(1.05)';
            element.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.7)';
          } else {
            // Zresetuj style dla produktów niebędących w porównaniu
            element.style.transform = 'scale(1)';
            element.style.boxShadow = 'none';
          }
        }
      });
    }
  }

  // Sprawdza, czy produkt znajduje się na liście porównawczej
  isProductInCompareList(product: any): boolean {
    return this.productsToCompare.some((p) => p.name === product.name);
  }

  // Aktywuje tryb porównania, jeśli wybrano wystarczającą liczbę produktów
  startComparison() {
    // Upewnij się, że do porównania wybrano co najmniej 2 produkty
    if (this.productsToCompare.length < 2) {
      alert('Please select at least 2 products to compare');
      return;
    }

    // Aktywuj tryb porównywania i podświetl wybrane produkty
    this.compareMode = true;
    this.highlightComparedProduct();
  }

  cancelComparison() {
    this.productsToCompare = [];
    this.compareMode = false;

    if (this.productItems) {
      this.productItems.forEach((item) => {
        const element = item.productContainer?.nativeElement;
        if (element) {
          element.style.transform = 'scale(1)';
          element.style.boxShadow = 'none';
        }
      });
    }
  }

  // Przygotowuje dane produktu do wyświetlenia porównania
  // Zwraca tablicę obiektów danych produktu z odpowiednimi właściwościami do porównania
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
