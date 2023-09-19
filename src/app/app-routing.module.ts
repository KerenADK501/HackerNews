import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { StoryListComponent } from './components/story-list/story-list.component'; 
import { StoryDetailComponent } from './components/story-detail/story-detail.component'; 

const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'stories', component: StoryListComponent }, 
  { path: 'stories/:id', component: StoryDetailComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

