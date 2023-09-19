import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HACKER_NEWS_SERVICE_TOKEN } from './injection-tokens'; // Adjust the path
import { HackerNewsService } from './hacker-news.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StoryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [    { provide: HACKER_NEWS_SERVICE_TOKEN, useClass: HackerNewsService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
