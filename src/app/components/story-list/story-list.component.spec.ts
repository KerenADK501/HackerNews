import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { of } from 'rxjs';
import { StoryListComponent } from './story-list.component';
import { HackerNewsService } from 'src/app/hacker-news.service';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let mockHackerNewsService: Partial<HackerNewsService>;
  let mockRouter: Partial<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    // Mock HackerNewsService
    mockHackerNewsService = {
      getNewestStories: () => of([1, 2, 3]), // Mocked story IDs
      getStory: (id: number) => of({ id, title: `Story ${id}`, url: `https://hacker-news.firebaseio.com/v0/${id}` }),
    };

    // Mock ActivatedRoute with query params
    mockActivatedRoute = {
      queryParams: of({ q: 'search query' } as Params), 
    };

    // Mock Router
    mockRouter = {
      navigate: jasmine.createSpy('navigate'), 
    };

    await TestBed.configureTestingModule({
      declarations: [StoryListComponent],
      providers: [
        { provide: HackerNewsService, useValue: mockHackerNewsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display stories with search query', () => {
    expect(component.stories).toEqual([{ id: 1, title: 'Story 1', url: 'https://hacker-news.firebaseio.com/v0/' }]);
  });

  it('should navigate to the previous page', () => {
    component.currentPage = 2; 

    component.previousPage();

    expect(component.currentPage).toBe(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith([], { relativeTo: mockActivatedRoute, queryParams: { page: 1 } });
  });

  it('should navigate to the next page', () => {
    component.currentPage = 1; 

    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith([], { relativeTo: mockActivatedRoute, queryParams: { page: 2 } });
  });
});
