import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Exchanger } from './components/exchanger/exchanger';
import { Store } from '../../services/store';
import { History } from './components/history/history';

@Component({
  standalone: true,
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [Exchanger, History],
})
export class Home {
  constructor(public store: Store) {}
}
