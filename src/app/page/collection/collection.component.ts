import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {

  imageNames: string[] = [];

  selectedImage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/images/data/images.json').subscribe((data: any) => {
      data.forEach((element: any) => {
        this.imageNames.push(element);
      })
    });
  }

  
  showImage(image: string) {
    this.selectedImage = image;
  }
}