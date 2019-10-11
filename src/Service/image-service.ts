import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpEnum } from "src/Enum/http-enum";
import { Images } from 'src/Models/images';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  getImageByCategory(category: string) {
    return this.http.get<Images[]>(HttpEnum.port + "index/GetImageByCategory?category="+category);
  }
}
