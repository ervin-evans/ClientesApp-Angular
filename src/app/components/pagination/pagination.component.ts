import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input()
  public pages: number[] = [];
  @Output()
  private actualPage: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  private previosPage: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  private nextPage: EventEmitter<number> = new EventEmitter<number>();
  @Input()
  public isLastPage: boolean = false;

  protected actualPageInner: number = 1;

  constructor() {}

  protected setActualPage(page: number): void {
    this.actualPageInner = page;
    this.actualPage.emit(page);
  }
  public goToPreviosPage() {
    console.log(this.isLastPage);
    this.actualPageInner -= 1;
    this.previosPage.emit(this.actualPageInner);
  }
  public goToNextPage() {
    this.actualPageInner += 1;
    this.nextPage.emit(this.actualPageInner);
  }
}
