import { GameFilter } from './../game-list-filter/game-list-filter.component';
import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../game-api.service';


import { Game } from './game';
import { GameActions } from './game-actions';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  defaultSize = 300;
  width = this.defaultSize;

  entities;

  filteredEntities = this.entities;
  totalRecords: Number;
  page: Number=1;
  private filterForm: GameFilter; 
  constructor(private gameapiService: GameApiService) { }


  ngOnInit() {
    setTimeout(() => {
      this.gameapiService.getGames().subscribe((data) => {
        this.entities = data;
        console.log(`Entities : ${JSON.stringify(this.entities)}`);
        this.totalRecords = this.entities.length;
        console.log(`TotalRecords : ${this.totalRecords}`);
        // this.entities = Array(50).fill(0).map((x, i) => ({ id: (i +1), name: `entity ${i + 1}`}));
        this.filter();
      })
    }, 2000);
  }

  truncate(value: string) {
    const words = value.split(' ', 20);

    return words.join(' ') + (words.length > 20 ? + '...' : '');
  }

  sizeUp() {
    this.width += 10;
  }

  sizeDown() {
    this.width = Math.max(100, this.width - 10);
  }

  sizeReset() {
    this.width = this.defaultSize;
  }

  onActionClick(action: GameActions, game: Game) {
    alert(`${['follow', 'share', 'buy'][action]} the game nammed ${game.title}`);
  }

  delete(id) {
    console.log(id);
    this.gameapiService.deleteGame(id).subscribe();
  }

  onFilter(filterForm: GameFilter) {
    this.filterForm = filterForm;
    this.filter()
  }

  private filter() {
    if (this.entities)
    if (this.filterForm)
    this.filteredEntities = this.entities
    // e = game mais c'est pas bien de faire des variables comme ça poncy ;)
    // c'est pas très intelligible tout ça
        .filter(e => (!this.filterForm.name || e.title.toLocaleLowerCase().includes(this.filterForm.name))
            && (!this.filterForm.category || e.genres.find(genre => genre.name === this.filterForm.category))
            && (!this.filterForm.editor || e.developer.toLowerCase().includes(this.filterForm.editor)));
    else
    this.filteredEntities = this.entities;
  }

}