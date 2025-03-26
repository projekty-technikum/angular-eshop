import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,

  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() searchChanged = new EventEmitter<string>();
  searchText: string = '';
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
