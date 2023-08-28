import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[upload]',
})
export class UploadDirective {
  @Output() onHover: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onFileDropped: EventEmitter<File> = new EventEmitter<File>();
  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.onHover.emit(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.onHover.emit(false);
  }

  @HostListener('drop', ['$event']) onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.onHover.emit(false);

    const files = event.dataTransfer?.files;
    const fileSelected = files[0];

    this.onFileDropped.emit(fileSelected);
  }
}
