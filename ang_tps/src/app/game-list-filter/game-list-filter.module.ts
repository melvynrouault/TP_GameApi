import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListFilterComponent } from './game-list-filter.component';

@NgModule({
  declarations: [GameListFilterComponent],
  imports: [
    CommonModule
  ],
  exports: [GameListFilterComponent]
})
export class GameListFilterModule { }