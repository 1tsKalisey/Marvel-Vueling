import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarvelService, Character } from '../services/marvel.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  characters: Character[] = [];

  constructor(private marvel: MarvelService) {}

  ngOnInit(): void {
    this.marvel
      .getCharacters({ page: 0, limit: 10 })
      .subscribe((res) => (this.characters = res.data.results));
  }
}
