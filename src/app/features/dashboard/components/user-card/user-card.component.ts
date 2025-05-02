import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../shared/models/user.model';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './user-card.component.html',
})

export class UserCardComponent {
  @Input() user!: User;
}