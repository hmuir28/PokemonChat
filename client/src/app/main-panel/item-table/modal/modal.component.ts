import { Component, ViewEncapsulation, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { ModalService } from './modal.service';

@Component({ 
  selector: 'jw-modal', 
  templateUrl: 'modal.component.html', 
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId: string = "custom-modal-1";

  @Output()
  triggerClose = new EventEmitter<any>();

  element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });

    this.modalService.add(this);
    const emitObject = { modalClose: this.close.bind(this) };
    this.triggerClose.emit(emitObject);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.modalId);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }
}
