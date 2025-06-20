import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as md5 from 'crypto-js';

/**
 * Model for a generic API page response.
 */
export interface ApiPage<T> {
  data: {
    results: T[];
    total: number;
    offset: number;
    limit: number;
  };
}

/** Character model returned by the Marvel API. */
export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string; extension: string };
}

/** Comic model returned by the Marvel API. */
export interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: { path: string; extension: string };
}

/** Event model returned by the Marvel API. */
export interface Event {
  id: number;
  title: string;
  description: string;
  thumbnail: { path: string; extension: string };
}

export type CharacterPage = ApiPage<Character>;
export type ComicPage = ApiPage<Comic>;
export type EventPage = ApiPage<Event>;

@Injectable({ providedIn: 'root' })
export class MarvelService {
  private readonly baseUrl = 'https://gateway.marvel.com/v1/public';

  constructor(private http: HttpClient) {}

  /**
   * Build common Marvel API parameters including auth hash.
   */
  private buildAuthParams(): HttpParams {
    const timestamp = Date.now().toString();
    const hash = md5
      .MD5(
        timestamp + environment.marvelPrivateKey + environment.marvelPublicKey
      )
      .toString();
    let params = new HttpParams()
      .set('ts', timestamp)
      .set('apikey', environment.marvelPublicKey)
      .set('hash', hash);
    return params;
  }

  /**
   * Fetch a page of characters from the Marvel API.
   */
  getCharacters(params: {
    page: number;
    limit: number;
    nameStartsWith?: string;
  }): Observable<CharacterPage> {
    let httpParams = this.buildAuthParams()
      .set('limit', params.limit)
      .set('offset', params.page * params.limit);
    if (params.nameStartsWith) {
      httpParams = httpParams.set('nameStartsWith', params.nameStartsWith);
    }
    return this.http.get<CharacterPage>(`${this.baseUrl}/characters`, {
      params: httpParams,
    });
  }

  /**
   * Fetch a page of comics from the Marvel API.
   */
  getComics(params: {
    page: number;
    limit: number;
    titleStartsWith?: string;
  }): Observable<ComicPage> {
    let httpParams = this.buildAuthParams()
      .set('limit', params.limit)
      .set('offset', params.page * params.limit);
    if (params.titleStartsWith) {
      httpParams = httpParams.set('titleStartsWith', params.titleStartsWith);
    }
    return this.http.get<ComicPage>(`${this.baseUrl}/comics`, {
      params: httpParams,
    });
  }

  /**
   * Fetch a page of events from the Marvel API.
   */
  getEvents(params: {
    page: number;
    limit: number;
    nameStartsWith?: string;
  }): Observable<EventPage> {
    let httpParams = this.buildAuthParams()
      .set('limit', params.limit)
      .set('offset', params.page * params.limit);
    if (params.nameStartsWith) {
      httpParams = httpParams.set('nameStartsWith', params.nameStartsWith);
    }
    return this.http.get<EventPage>(`${this.baseUrl}/events`, {
      params: httpParams,
    });
  }
}
