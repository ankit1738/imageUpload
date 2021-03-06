import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploa-image',
  templateUrl: './uploa-image.component.html',
  styleUrls: ['./uploa-image.component.css']
})
export class UploaImageComponent implements OnInit {
  reader = new FileReader();
  title = 'Crop image and Upload';
  uploadedFile: File;
  images: Array<string> = [];
  errorMsg: string;
  successMsg: string;
  imgURL: any;
  isImageSelected: boolean;

  constructor(private uploadService: UploadService, private router: Router) {
  }

  ngOnInit(): void {
  }
  // Retrives the file and Creates the canvas.
  uploadFile(element) {
    this.isImageSelected = true;
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

  // Draws Cropped image oncanvas
  drawImages(img: HTMLImageElement) {
    this.images = [];
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

  // Calls the uploadImage Service to send the image data to upload api
  upload(index?: number) {
    const formData = new FormData();
    switch (index) {
      case 1: formData.append('uploads', this.images[0]);
              break;
      case 2: formData.append('uploads', this.images[1]);
              break;
      case 3: formData.append('uploads', this.images[2]);
              break;
      case 4: formData.append('uploads', this.images[3]);
              break;
      default: {
        for (const image of this.images) {
          formData.append('uploads', image);
        }
      }
    }

    const uploadedImages = formData.getAll('uploads');

    this.uploadService.uploadImage(uploadedImages)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/viewImages']);
      });
  }


}
