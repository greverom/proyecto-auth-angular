import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalDto, modalInitializer } from '../../../shared/modal/modal.dto';


@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalSubject = new BehaviorSubject<ModalDto>(modalInitializer());
  modal$ = this.modalSubject.asObservable();

  show(config: Partial<ModalDto>) {
    this.modalSubject.next({
      ...modalInitializer(),
      ...config,
      show: true,
    });
  
    if (!config.showButtons) {
      setTimeout(() => {
        this.hide();
      }, 4000);
    }
  }

  close() {
    const current = this.modalSubject.value;
    current.close?.(); 
    this.modalSubject.next(modalInitializer());
  }

  confirm() {
    const current = this.modalSubject.value;
    current.confirm?.();
    this.modalSubject.next(modalInitializer());
  }

  hide() {
    this.modalSubject.next(modalInitializer());
  }
  
}