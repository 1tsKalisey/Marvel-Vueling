import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { debounceTime, switchMap, startWith } from 'rxjs/operators';
import { MarvelService, Comic } from '../services/marvel.service';

@Component({
  selector: 'app-comics-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './comics-list.component.html',
  styleUrl: './comics-list.component.scss'
})
export class ComicsListComponent implements OnInit {
  search = new FormControl('');
  comics: Comic[] = [];

  constructor(private marvel: MarvelService) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap((query) =>
          this.marvel.getComics({ page: 0, limit: 20, titleStartsWith: query || undefined })
        )
      )
      .subscribe((res) => (this.comics = res.data.results));
  }
}
