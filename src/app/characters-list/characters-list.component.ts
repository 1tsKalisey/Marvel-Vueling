import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, startWith } from 'rxjs/operators';
import { MarvelService, Character } from '../services/marvel.service';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss'
})
export class CharactersListComponent implements OnInit {
  search = new FormControl('');
  characters: Character[] = [];

  constructor(private marvel: MarvelService) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap((query) =>
          this.marvel.getCharacters({ page: 0, limit: 20, nameStartsWith: query || undefined })
        )
      )
      .subscribe((res) => (this.characters = res.data.results));
  }
}
