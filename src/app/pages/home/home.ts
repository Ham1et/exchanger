import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Exchanger } from './components/exchanger/exchanger';
import { Store } from '../../services/store';

@Component({
  standalone: true,
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [Exchanger],
})
export class Home {
  constructor(public store: Store) {}
}
