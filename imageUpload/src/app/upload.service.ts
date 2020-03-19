import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public uploadImage(uploadedImages) {
    return this.http.post('/api/upload', {uploadedImages});
  }

  public getImages() {
    return this.http.get('/api/getImages');
  }
}
