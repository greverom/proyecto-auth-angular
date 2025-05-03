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
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async handleCreateContact(formData: any) {
    const camposRequeridos = ['name', 'last_name', 'email', 'phone'];
    const camposFaltantes = camposRequeridos.filter(
      (campo) => !formData[campo] || formData[campo].trim() === ''
    );
  
    if (camposFaltantes.length > 0) {
      return; 
    }
  
    const user = await firstValueFrom(this.store.select(selectUserData));
    if (!user?.id) return;
  
    const cleanData = {
      ...formData,
      user_id: user.id,
    };
  
    await this.contactService.createContact(cleanData);
    this.contacts = await this.contactService.getContactsByUser(user.id);
    this.closeModal(); 
  }
}