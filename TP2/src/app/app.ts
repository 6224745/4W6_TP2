import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
registerLocaleData(localeFr, 'fr'); 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, TranslateModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TP2');

  language : string = "fr";

  constructor(public translator : TranslateService)
  {
    this.translator.addLangs(['en', 'fr']);
    this.translator.setFallbackLang(this.language);
    this.translator.use(this.language);
  }

  ngOnInit() {}

  changeLanguage(){
    this.translator.use(this.language);
  }
}
