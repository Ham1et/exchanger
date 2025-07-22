import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Exchanger } from './components/exchanger/exchanger';

@Component({
  standalone: true,
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [Exchanger],
})
export class Home {}
