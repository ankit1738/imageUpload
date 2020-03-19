import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.css']
})
export class ViewImagesComponent implements OnInit {

  imageURL: any = [];
  constructor(private uploadService: UploadService, private router: Router) {
    this.uploadService.getImages()
    .subscribe((response) => {
      this.imageURL = response;
      console.log(this.imageURL);
    });
  }

  ngOnInit(): void {
  }

}
