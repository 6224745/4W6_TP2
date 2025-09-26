import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify';
import { Song } from '../models/song';

@Component({
  selector: 'app-song',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './song.html',
  styleUrl: '../../styles.css'
})
export class SongComponent {

  constructor(public spotiService: SpotifyService, public route: ActivatedRoute) {}

  albumId: string | null = null;
  albumName: string | null = null;
  tabSongs: Song[] = [];

  ngOnInit() {
    this.spotiService.connect();
    this.albumId = this.route.snapshot.paramMap.get("albumId");
    this.albumName = this.route.snapshot.paramMap.get("albumName");
    this.getSongs();
  }

  async getSongs() {
    this.tabSongs = await this.spotiService.getSongs(this.albumId);
  }
}
