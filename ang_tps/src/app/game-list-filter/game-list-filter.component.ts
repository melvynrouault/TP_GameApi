import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameApiService } from '../game-api.service';
export interface GameFilter {
  name: string;
  category: string;
  editor: string;
}

@Component({
  selector: 'app-game-list-filter',
  templateUrl: './game-list-filter.component.html',
  styleUrls: ['./game-list-filter.component.scss']
})
export class GameListFilterComponent implements OnInit {

  gameCategories;

  form: GameFilter = { name: '', category: '', editor: '' };

  @Output()
  filter = new EventEmitter<GameFilter>();

  constructor(private gameapiService: GameApiService) { }

  ngOnInit() {
    this.gameapiService.getCategories().subscribe((data) => {
        this.gameCategories = data;
        console.log(this.gameCategories);
    });
  }

  onChange(key: string, value: string) {
    if (key !== 'category') { value = value.trim().toLowerCase(); }
    this.form[key] = value;
  }

  onSubmit(event: any) {
    event.preventDefault();
    this.filter.emit(this.form);
    // this.gameapiService.getGames();
  }

  onReset() {
    this.form = { name: '', category: '', editor: '' };
    this.filter.emit(this.form);
  }
}
