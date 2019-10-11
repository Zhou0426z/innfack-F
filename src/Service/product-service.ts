import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpEnum } from "src/Enum/http-enum";
import { InCollectionProductsVM } from "src/ViewModels/In/in-collection-products-vm";
import { Guid } from "guid-typescript";
import { InProductVM } from "src/ViewModels/In/in-product-vm";
import { InAsideProductsVM } from 'src/ViewModels/In/in-aside-products-vm';
@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getCollectionProducts(category: string) {
    return this.http.get<InCollectionProductsVM[]>(
      HttpEnum.port + `Collection/GetCollectionProducts?category=${category}`
    );
  }
  getProduct(productID: Guid) {
    return this.http.get<InProductVM>(
      HttpEnum.port + `Product/GetProduct?productID=${productID}`
    );
  }
  getAboutProducts(productID: Guid) {
    return this.http.get<InAsideProductsVM[]>(
      HttpEnum.port + `Product/GetAboutProducts?productID=${productID}`
    );

  }
}
