import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {
  isLoading = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.spinnerState$.subscribe(state => {
      this.isLoading = state;
    });
  }
}
