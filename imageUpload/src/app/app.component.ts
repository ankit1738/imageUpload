import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('horizontal') horizontal: ElementRef;
  reader = new FileReader();
  title = 'imageUpload';
  uploadedFile: File;
  images: Array<string> = [];
  errorMsg: string;
  successMsg: string;
  imgURL: any;
  isImageSelected: boolean;

  constructor(private http: HttpClient) {

  }

  uploadFile(element) {
    this.uploadedFile = element.target.files[0];
    this.reader.readAsDataURL(this.uploadedFile);

    const img = new Image();
    img.src = window.URL.createObjectURL(this.uploadedFile);

    this.reader.onload = () => {
      this.errorMsg = '';
      this.successMsg = '';
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      console.log(width + '  ' + height);
      if (width !== 1024 || height !== 1024) {
        this.errorMsg = `Image dimensions not correct.\n Required Dimensions 1024 x 1024\n Your dimensions
        ${img.naturalHeight} x ${img.naturalWidth}`;
      } else {
        // this.isImageSelected = true;
        this.successMsg = 'Correct Size';
        this.imgURL = this.reader.result;
        this.drawImages(img);
      }
      window.URL.revokeObjectURL(img.src);
    };
  }

  drawImages(img: HTMLImageElement) {
    const canvas1 = document.getElementById('horizontal') as HTMLCanvasElement;
    const ctx1 = canvas1.getContext('2d');
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    setTimeout(() => {
      ctx1.drawImage(img, 0, 0);
      this.images.push(canvas1.toDataURL());
    }, 1000);

    const canvas2 = document.getElementById('verticle') as HTMLCanvasElement;
    const ctx2 = canvas2.getContext('2d');
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    setTimeout(() => {
      ctx2.drawImage(img, 0, 0);
      this.images.push(canvas2.toDataURL());
    }, 1000);

    const canvas3 = document.getElementById('horizontalSmall') as HTMLCanvasElement;
    const ctx3 = canvas3.getContext('2d');
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    setTimeout(() => {
      ctx3.drawImage(img, 0, 0);
      this.images.push(canvas3.toDataURL());
    }, 1000);

    const canvas4 = document.getElementById('gallery') as HTMLCanvasElement;
    const ctx4 = canvas4.getContext('2d');
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
    setTimeout(() => {
      ctx4.drawImage(img, 0, 0);
      this.images.push(canvas4.toDataURL());
    }, 1000);

  }

  upload() {
    const formData = new FormData();
    for (const image of this.images) {
      formData.append('uploads[]', image);
    }

    this.http.post('/api/upload', formData)
      .subscribe((response) => {
        console.log('response received is ', response);
      });

  }

}


