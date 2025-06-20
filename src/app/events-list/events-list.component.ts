import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, startWith } from 'rxjs/operators';
import { MarvelService, Event } from '../services/marvel.service';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss'
})
export class EventsListComponent implements OnInit {
  search = new FormControl('');
  events: Event[] = [];

  constructor(private marvel: MarvelService) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap((query) =>
          this.marvel.getEvents({ page: 0, limit: 20, nameStartsWith: query || undefined })
        )
      )
      .subscribe((res) => (this.events = res.data.results));
  }
}
