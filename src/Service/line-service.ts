import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class LineService {
  constructor(private http: HttpClient) {}

  lineLoginInit() {
    var responseType = "response_type=code&";
    var channelID: string = "client_id=1621253637&";
    var redirectUri: string = "redirect_uri=http://localhost:4200/index&";
    var state: string = "state=test&";
    var scope: string = "scope=openid%20profile";
    var url: string = `https://access.line.me/oauth2/v2.1/authorize?${responseType}${channelID}${redirectUri}${state}${scope}`;
    (window as any).location.href = url;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded"
      }),
      body: {
        grant_type: "authorization_code",
        code: "QWi53D6To4hYb2bKxCIN",
        redirect_uri: "http://localhost:4200/index",
        client_id: "1621253637",
        client_secret: "93d2902f9a072eb93bae06a7571e3cb7"
      }
    };
    this.http
      .post("https://api.line.me/v1/oauth/accessToken", httpOptions)
      .subscribe(data => {
        console.log(data);
      });
  }
}
