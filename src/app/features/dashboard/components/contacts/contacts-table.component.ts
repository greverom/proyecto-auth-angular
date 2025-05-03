import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ContactService } from '../../../../core/services/contact.service';
import { Contact } from '../../../../shared/models/contacts.model';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectUserData } from '../../../../core/store/user.selector';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-contacts-table',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './contacts-table.component.html',
})
export class ContactsTableComponent implements OnInit {
  @Input() contacts: Contact[] = [];

  columns = ['name', 'last_name', 'phone', 'email', 'age', 'created_at'];

  columnLabels: Record<string, string> = {
    name: 'Name',
    last_name: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    age: 'Age',
    created_at: 'Created At',
  };

  constructor(
    private contactService: ContactService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserData).pipe(take(1)).subscribe(async (user: User | null) => {
      if (user?.id) {
        this.contacts = await this.contactService.getContactsByUser(user.id);
      }
    });
  }

  onAction(event: { action: string; item: Contact }) {
    console.log('Acción:', event.action, event.item);
  }
}