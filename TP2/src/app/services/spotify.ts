import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist } from '../models/artist';


const CLIENT_ID: string = "330ef220cf864f509e3ccb791e610f3d";
const CLIENT_SECRET: string = "69bc53ef905e47a485aec939fa920b13";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyToken: string | null = null;

  constructor(public http: HttpClient) {}

  async connect() : Promise<void> {
    
    let body = new HttpParams().set('grant_type', 'client_credentials');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      })
    };
    let x = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions))
    console.log(x);
    this.spotifyToken = x.access_token;
  }

  async getArtist(artistName : string): Promise<Artist> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.spotifyToken
      })
    };

    let x = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artistName, httpOptions));
    console.log(x);

    return new Artist(x.artists.items[0].id, x.artists.items[0].name, x.artists.items[0].images[0].url);
  }
}
