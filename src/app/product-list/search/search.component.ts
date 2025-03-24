import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,

  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchText: string = '';
  currentSearch: string = '';

  handleSearch() {
    if (this.searchText) {
      this.currentSearch = this.searchText;
    }
  }
}
