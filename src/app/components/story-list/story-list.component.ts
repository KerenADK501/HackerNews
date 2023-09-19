import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from 'src/app/hacker-news.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],
})
export class StoryListComponent implements OnInit {
  newestStoryIds: number[] = [];
  stories: any[] = [];
  currentPage: number = 1; 
  searchQuery: string = '';

  constructor(
     private hackerNewsService: HackerNewsService,
     private router: Router, 
     private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.hackerNewsService.getNewestStories().subscribe((ids) => {
        this.newestStoryIds = ids;
        this.route.queryParams.subscribe((params: any) => {
          this.searchQuery = params['q'] || '';
          this.fetchStories();
        });
      });
    }
  
    fetchStories(): void {
      const startIndex = (this.currentPage - 1) * 10;
      const endIndex = startIndex + 10;
  
      this.stories = [];
  
      for (let i = startIndex; i < endIndex; i++) {
        const id = this.newestStoryIds[i];
  
        if (id) {
          this.hackerNewsService.getStory(id).subscribe((story) => {
            if (this.isStoryNew(story) && story.url && (this.searchQuery === '' || story.title.toLowerCase().includes(this.searchQuery.toLowerCase()))) {
              this.stories.push(story);
            }
          });
        }
      }
    }

    isStoryNew(story: any): boolean {
      // Convert Unix timestamp to milliseconds and create a Date object
      const storyTimestamp = story.time * 1000;
      const storyDate = new Date(storyTimestamp);
    
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
      return storyDate >= twentyFourHoursAgo;
    }
    
  
    nextPage(): void {
      if (this.currentPage * 10 < this.newestStoryIds.length) {
        this.currentPage++;
        this.fetchStories();
      }
    }
  
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchStories();
      }
    }
  }