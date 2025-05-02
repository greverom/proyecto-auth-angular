import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../core/services/modal.service';
import { ModalDto } from './modal.dto';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  modal: ModalDto;

  constructor(private modalService: ModalService) {
    this.modal = {
      show: false,
      message: '',
      isError: false,
      isSuccess: false,
      isInfo: false,
      close: () => {},
      confirm: () => {}
    };
  }

  ngOnInit(): void {
    this.modalService.modal$.subscribe(modal => {
      this.modal = modal;
    });
  }

  closeModal(): void {
    this.modalService.close();
  }

  confirm(): void {
    this.modalService.confirm();
  }
}