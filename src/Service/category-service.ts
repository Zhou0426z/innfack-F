import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpEnum } from "src/Enum/http-enum";
import { Categories } from 'src/Models/categories';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  getHeaderCategories() {
    

    // return this.http.get<Categories[]>("https://innfactb20200509222305.azurewebsites.net/api/Index/GetHeaderCategories");

    return this.http.get<Categories[]>(HttpEnum.port + "Index/GetHeaderCategories");
  }
  getAsideCategories(){
    return this.http.get<Categories[]>(HttpEnum.port + "Collection/GetAsideCategories");
  }
}
