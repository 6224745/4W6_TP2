import { Component } from '@angular/core';
import { Artist } from '../models/artist';
import { SpotifyService } from '../services/spotify';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-artist',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './artist.html',
  styleUrl: '../../styles.css'
})
export class ArtistComponent {

  artistName: string = "";
  artiste?: Artist;
  tabArtist: Artist[] = [];

  constructor(public spotiService: SpotifyService) {}

  ngOnInit() {
    this.spotiService.connect();
    this.loadFavoriteArtists();
  }

  async getArtist(): Promise<void> {
    this.artiste = await this.spotiService.getArtist(this.artistName);
    if(this.artiste)
    {
      const existArtist = this.tabArtist.find(a => a.id == this.artiste?.id);
      if(!existArtist)
      {
        this.tabArtist.push(this.artiste);
      }
    }
    this.artistName = ""
    localStorage.setItem("TabArtists", JSON.stringify(this.tabArtist));
  }

  viderTab() {
    this.tabArtist = [];
    localStorage.removeItem("TabArtists")
  }

  loadFavoriteArtists() {
    const favorites = localStorage.getItem('TabArtists');
    if (favorites) {
      this.tabArtist = JSON.parse(favorites);
    }
  }
}
