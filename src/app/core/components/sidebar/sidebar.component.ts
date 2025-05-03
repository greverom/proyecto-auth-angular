import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../shared/models/user.model';
import { Observable } from 'rxjs';
import { selectUserData } from '../../store/user.selector';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../services/modal/notice.service';
import { ModalService } from '../../services/modal/modal.service';

interface SidebarItem {
  icon: string;
  text: string;
  route: string;
}

 interface SidebarCategory {
  icon: string;
  title: string;
  baseRoute: string;
  children: { text: string; route: string }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarClosed = true;
  userData$!: Observable<User | null>;

  currentRoute: string = '';
  categoryStates: Record<string, boolean> = {};

  navItems: SidebarItem[] = [
    { icon: 'home', text: 'Inicio', route: '/dashboard' },
    { icon: 'person', text: 'Perfil', route: '/dashboard/perfil' },
    { icon: 'settings', text: 'Contactos', route: '/dashboard/contacts' }
  ];

  navCategories: SidebarCategory[] = [
    {
      icon: 'grid_view',
      title: 'Ejemplo',
      baseRoute: '/ejemplo',
      children: [
        { text: 'Opción 1', route: '/ejemplo/opcion1' },
        { text: 'Opción 2', route: '/ejemplo/opcion2' }
      ]
    },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
    private notification: NotificationService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.userData$ = this.store.select(selectUserData);

    this.navCategories.forEach((cat) => {
      this.categoryStates[cat.title] = false;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route ;
  }

  isCategoryActive(baseRoute: string): boolean {
    return this.currentRoute.startsWith(baseRoute);
  }

  toggleCategory(title: string) {
    for (const key in this.categoryStates) {
      this.categoryStates[key] = key === title ? !this.categoryStates[key] : false;
    }
  }

  openSidebar(event: Event) {
    event.stopPropagation();
    this.isSidebarClosed = false;
  }

  closeSidebar(event: Event) {
    event.stopPropagation();
    this.isSidebarClosed = true;
    Object.keys(this.categoryStates).forEach((key) => (this.categoryStates[key] = false));
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector('.sidebar');
    const isClickInsideSidebar = sidebar?.contains(target);
  
    if (this.isModalVisible) {
      return;
    }
  
    if (!isClickInsideSidebar && window.innerWidth <= 768) {
      this.isSidebarClosed = true;
    }
  }

  get isModalVisible(): boolean {
    return this.modalService['modalSubject'].value.show;
  }

async logout(): Promise<void> {
  this.notification.confirm({
    message: '¿Estás seguro que deseas cerrar sesión?',
    confirm: async () => {
      try {
        await this.authService.logout();
        this.router.navigate(['/auth/login']);
      } catch (error) {
        this.notification.error('Ocurrió un error al cerrar sesión.');
      }
    },
    cancel: () => {
      this.notification.success('Has cancelado el cierre de sesión.');
    }
  });
}
}