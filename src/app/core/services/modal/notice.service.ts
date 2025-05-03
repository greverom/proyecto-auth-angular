import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private modalService: ModalService) {}

  success(message: string): void {
    this.modalService.show({
      message,
      isError: false,
      show: true,
      showButtons: false,
      close: () => {},
    });
  }

  error(message: string): void {
    this.modalService.show({
      message,
      isError: true,
      show: true,
      showButtons: false,
      close: () => {},
    });
  }

  confirm(options: {
    message: string;
    confirm: () => void | Promise<void>;
    cancel?: () => void;
  }): void {
    this.modalService.show({
      message: options.message,
      isError: false,
      show: true,
      showButtons: true,
      confirm: options.confirm,
      close: options.cancel ?? (() => {}),
    });
  }
}