import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify';
import { Song } from '../models/song';
import { GoogleService } from '../services/google';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const youtubeURL = "https://www.youtube.com/embed/";
@Component({
  selector: 'app-song',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './song.html',
  styleUrl: '../../styles.css'
})
export class SongComponent {

  constructor(public spotiService: SpotifyService, public route: ActivatedRoute, public google : GoogleService, public sanitizer : DomSanitizer) {}

  albumId: string | null = null;
  albumName: string | null = null;
  tabSongs: Song[] = [];
  videoId : string = "";
  videoUrl ?: SafeResourceUrl;

  ngOnInit() {
    this.spotiService.connect();
    this.albumId = this.route.snapshot.paramMap.get("albumId");
    this.albumName = this.route.snapshot.paramMap.get("albumName");
    this.getSongs();
  }

  async getSongs() {
    this.tabSongs = await this.spotiService.getSongs(this.albumId);
  }

  async searchVideo(videoSearchText : string): Promise<void>{
    this.videoId = await this.google.searchVideoId(videoSearchText);

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeURL + this.videoId);
  }
}
