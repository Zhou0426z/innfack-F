import { Component, OnInit, AfterViewInit } from "@angular/core";
import Swiper from "swiper";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ImageService } from "src/Service/image-service";
import { Images } from "src/Models/images";
import { Observable } from "rxjs";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements AfterViewInit, OnInit {
  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
  }

  swiper: Swiper;
  Images: Images[];

  ngAfterViewInit() {
    this.swiperInit();

    // var url:string =(window as any).location.href;
    // if(url.indexOf("code=")!=-1){
    //   var split =  url.split("code=");
    //   var value = split[1].split("&");
    //   var result = value[0];
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     }),
    //     body:{
    //       grant_type: "authorization_code",
    //       code	:result,
    //       redirect_uri:"http://localhost:4200/index",
    //       client_id:"1621253637",
    //       client_secret:"93d2902f9a072eb93bae06a7571e3cb7"
    //     }

    //   };
    //   this.httpClient
    //     .post("http://api.line.me/v1/oauth/accessToken", httpOptions)
    //     .subscribe(data => {
    //       console.log(data);
    //     });

    // }
  }

  async swiperInit() {
    await this.imageService
      .getImageByCategory("index_carousel")
      .toPromise().then(data=>this.Images = data);
      
      this.swiper = new Swiper(".swiper-container", {
        observer:true,
        autoplay: {
          delay: 2500
        },
        direction: "horizontal",
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
  

  }
}
