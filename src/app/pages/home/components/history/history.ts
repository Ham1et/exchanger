import { Component } from '@angular/core';
import { Store } from '../../../../services/store';

@Component({
  standalone: true,
  selector: 'app-history',
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  constructor(public store: Store) {}

  onBack(id: number) {
    this.store.historyBack(id);
  }
}
