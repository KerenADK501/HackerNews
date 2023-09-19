import { InjectionToken } from '@angular/core';
import { HackerNewsService } from 'src/app/hacker-news.service';

export const HACKER_NEWS_SERVICE_TOKEN = new InjectionToken<HackerNewsService>('HackerNewsService');
