import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

export interface SidebarItem {
  icon: string;
  text: string;
  route: string;
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

  currentRoute: string = '';
  categoryStates: Record<string, boolean> = {};

  navItems: SidebarItem[] = [
    { icon: 'home', text: 'Inicio', route: '/home' },
    { icon: 'person', text: 'Perfil', route: '/profile' },
    { icon: 'settings', text: 'Configuración', route: '/settings' }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.categoryStates['Ejemplo'] = false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route || this.currentRoute.startsWith(route + '/');
  }

  toggleCategory(title: string) {
    for (const key in this.categoryStates) {
      if (key === title) {
        this.categoryStates[key] = !this.categoryStates[key];
      } else {
        this.categoryStates[key] = false;
      }
    }
  }

  openSidebar(event: Event) {
    event.stopPropagation();
    this.isSidebarClosed = false;
  }

  closeSidebar(event: Event) {
    event.stopPropagation();
    this.isSidebarClosed = true;
    for (const title in this.categoryStates) {
      if (this.categoryStates.hasOwnProperty(title)) {
        this.categoryStates[title] = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector('.sidebar');
    const isClickInsideSidebar = sidebar?.contains(target);

    if (!isClickInsideSidebar && window.innerWidth <= 768) {
      this.isSidebarClosed = true;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
