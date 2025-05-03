import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsTableComponent } from '../../components/contacts/tabla/contacts-table.component';
import { ContactService } from '../../../../core/services/contact.service';
import { Contact } from '../../../../shared/models/contacts.model';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../../../core/store/user.selector';
import { firstValueFrom } from 'rxjs';
import { ContactModalComponent } from '../../components/contacts/agregar-contact-modal/contact-modal.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ContactsTableComponent, ContactModalComponent],
  templateUrl: './contact-page.component.html',
})
export class ContactPageComponent implements OnInit {
  contacts: Contact[] = [];
  showModal = false;
  contactToEdit: Contact | null = null;

  constructor(
    private contactService: ContactService,
    private store: Store
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await firstValueFrom(this.store.select(selectUserData));
    if (!user?.id) return;

    this.contacts = await this.contactService.getContactsByUser(user.id);
  }

  openAddModal() {
    this.contactToEdit = null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onTableAction(event: { action: string; item: Contact }) {
    if (event.action === 'edit') {
      this.contactToEdit = event.item;
      this.showModal = true;
    }
  }

  async handleCreateContact(payload: { data: Contact; id?: number }) {
    const { data, id } = payload;
  
    const camposRequeridos: (keyof Contact)[] = ['cedula', 'name', 'last_name', 'email', 'phone', 'age'];
    const camposFaltantes = camposRequeridos.filter(
      (campo) => !data[campo] || (typeof data[campo] === 'string' && data[campo].trim() === '')
    );
    if (camposFaltantes.length > 0) return;
  
    const user = await firstValueFrom(this.store.select(selectUserData));
    if (!user?.id) return;
  
    const contacto: Contact = {
      ...data,
      user_id: user.id,
    };
  
    if (id) {
      await this.contactService.updateContact(id, contacto); 
    } else {
      await this.contactService.createContact(contacto);
    }
  
    this.contacts = await this.contactService.getContactsByUser(user.id);
    this.closeModal();
    this.contactToEdit = null;
  }
}