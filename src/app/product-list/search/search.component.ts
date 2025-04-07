import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  // Właściwość wyjściowa do powiadamiania komponentu nadrzędnego o zmianie zapytania wyszukiwania
  @Output() searchChanged = new EventEmitter<string>();

  // Właściwość do śledzenia tego, co aktualnie znajduje się w polu wyszukiwania
  searchText: string = '';

  // Właściwość do przechowywania aktywnie stosowanego wyszukiwanego hasła
  // Rozróżnia to między tym, co znajduje się w polu wejściowym, a tym, co zostało przesłane
  currentSearch: string = '';

  handleSearch() {
    if (this.searchText) {
      this.currentSearch = this.searchText;
      this.searchChanged.emit(this.searchText);
    }
  }

  clearSearch() {
    this.searchText = '';
    this.currentSearch = '';
    this.searchChanged.emit('');
  }
}
