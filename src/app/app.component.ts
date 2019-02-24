import { Component, OnInit } from '@angular/core';
import { GetImagesService } from './get-images.service';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  search: string;
  atLeastOneSearch = false;
  results: any [] = [];
  timeOut: number;
  isSearching = false;
  noResultsFound = false;

  itemsNumber = 20;
  selectedImg: any;
  showDetails = false;
  lastScroll = 0;
  page = 1;

constructor(private getImagesService: GetImagesService) {
}
  ngOnInit() {
      // lazy loading on scroll down
      document.getElementById('main').addEventListener('scroll', (event) => {
        this.handelScroll(event.target['scrollTop'] );
      });
  }

  newSearch() {
      // reset parms for new query
      this.results = [];
      this.page = 1;
      this.lastScroll = 0;
      window.scrollTo(0, 0);
      this.getImages();
  }

   getImages = () => {
      // only one server in 500 mil seconds
      if (this.timeOut) {
        window.clearTimeout(this.timeOut);
      }
      this.timeOut = window.setTimeout(() => {
        this.isSearching = true;
        this.atLeastOneSearch = true;
        this.getImagesService.getResults(this.search, this.page).subscribe(results => {
              this.handelResults(results);
            });
      }, 500);
  }

  handelResults(results) {
    if (results['hits'].length === 0) {
      this.noResultsFound = true;
    } else {
      this.noResultsFound = false;
    }
    this.results = this.results.concat(results['hits']);
    this.isSearching = false;
  }

  handelScroll(YOffset) {
    if (YOffset >  this.lastScroll + 600) {
      this.page =  this.page + 1 ;
      this.getImages();
      this.lastScroll = YOffset;
    }
  }

  imgClicked(img) {
    this.selectedImg = img;
    this.showDetails = true;
  }

  closeClicked(e) {
    this.showDetails = !e.closeDetails;
}

}
