import { Component } from '@angular/core';
import { Album } from '../models/album';
import { SpotifyService } from '../services/spotify';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './album.html',
  styleUrl: '../../styles.css'
})
export class AlbumComponent {
  artistID: string | null = null;
  artistName: string | null = null;
  tabAlbums: Album[] = [];

  constructor(public spotiService: SpotifyService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.spotiService.connect();
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    this.artistID = this.route.snapshot.paramMap.get("artistId");
    this.getAlbums();
  }

  async getAlbums(): Promise<void>{
    this.tabAlbums = await this.spotiService.getAlbums(this.artistID)
  }
}
