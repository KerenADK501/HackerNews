import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  
})
export class HeaderComponent {
  title: string = 'Hacker News';
  searchQuery: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  searchStories(): void {
    
    if (this.searchQuery.trim()) {
      this.router.navigate(['/stories'], { queryParams: { q: this.searchQuery } });
    }
  }
  clearSearch(): void {
    this.searchQuery = ''; 
    this.router.navigate(['/stories']); 
  }

}
