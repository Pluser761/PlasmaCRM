import { Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  private elementRef: ElementRef = inject(ElementRef);

  @Input() excludeSelectors: string[] = [];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    const clickedOnExclude = this.excludeSelectors.some(selector => (event.target as Element).closest(selector) != null);
    if (!clickedInside && !clickedOnExclude) {
      this.clickOutside.emit();
    }
  }
}