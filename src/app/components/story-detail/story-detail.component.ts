import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackerNewsService } from 'src/app/hacker-news.service';
import { HACKER_NEWS_SERVICE_TOKEN } from 'src/app/injection-tokens'; // adjust path as needed


@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css'],
})
export class StoryDetailComponent implements OnInit {
  story: any; 

  constructor(
    private route: ActivatedRoute,
    @Inject(HACKER_NEWS_SERVICE_TOKEN) private hackerNewsService: HackerNewsService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const storyId = +idParam; 
      this.hackerNewsService.getStory(storyId).subscribe((data) => {
        this.story = data;
      });
    } else {
      console.error('Story ID not provided in the route.');
    }
  }
}

