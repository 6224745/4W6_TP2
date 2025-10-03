import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Show } from '../models/show';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BandsintownService } from '../services/bandsintown';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-show',
  imports: [GoogleMapsModule, CommonModule, FormsModule, RouterModule, DatePipe, TranslateModule],
  templateUrl: './show.html',
  styleUrl: '../../styles.css'
})
export class ShowComponent {

  artistName: string | null = null;
  tabShows: Show[] = [];
  centre: {lat: number, lng: number} = {lat: 0, lng: 0};
  zoom: number = 2;

  constructor(public route: ActivatedRoute, public http: HttpClient, public bandsInTownService: BandsintownService){}

  ngOnInit(): void {
    this.artistName = this.route.snapshot.paramMap.get("artistName")
    if(this.artistName != null){
      this.GetShow(this.artistName)
    }
  }

  async GetShow(Artistname: string): Promise<void>{
    this.tabShows = await this.bandsInTownService.GetShows(Artistname)
    if(this.tabShows.length == 0){
      console.log("Pas de concerts trouver pour " + Artistname)
    }
  }

  calculerPosition(val : string): number {
    return parseFloat(val);
  }
}
