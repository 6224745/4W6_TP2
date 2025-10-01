import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root'
})
export class BandsintownService {
  
  bandInTownToken: string = "2b32475766802ac01eefda45e9e42ea0";
  constructor(public http: HttpClient) { }

  async GetShows(artistName: string): Promise<Show[]>{
    let x = await lastValueFrom(this.http.get<any>("https://rest.bandsintown.com/artists/" + artistName +"/events?app_id=" + this.bandInTownToken))
    let tabShows: Show[] = []
    for (let i = 0; i < x.length; i++){
      tabShows.push(new Show(x[i].venue.latitude, x[i].venue.longitude, x[i].venue.country, x[i].venue.city, x[i].datetime))
    }
    return tabShows
  }
}
