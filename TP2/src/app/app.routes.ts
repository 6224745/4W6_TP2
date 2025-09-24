import { Routes } from '@angular/router';
import {ArtistComponent } from './artist/artist';
import { AlbumComponent } from './album/album';
import { ShowComponent } from './show/show';
import { SongComponent } from './song/song';

export const routes: Routes = [
    {path: "", redirectTo: "/artist", pathMatch: "full"},
    {path: "artist", component: ArtistComponent},
    {path: "album", component: AlbumComponent},
    {path: "show", component: ShowComponent},
    {path: "song", component: SongComponent},
];
