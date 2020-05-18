import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class LineService {
  constructor(private http: HttpClient) {}

  lineLoginInit() {
    var responseType = "response_type=code&";
    var channelID: string = "client_id=1621253637&";
    var redirectUri: string = "redirect_uri=https://localhost:4200/line&";
    var state: string = "state=test&";
    var scope: string = "scope=openid%20profile%20email";
    var url: string = `https://access.line.me/oauth2/v2.1/authorize?${responseType}${channelID}${redirectUri}${state}${scope}`;
    (window as any).location.href = url;
  }

  getToken(code: string) {
    var headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    var params = new HttpParams()
      .set("grant_type", "authorization_code")
      .set("code", code)
      .set("redirect_uri", "https://localhost:4200/line")
      .set("client_id", "1621253637")
      .set("client_secret", "d46de56ba27d4bbda8179608b85b6d3b");
    return this.http.post<any>(`https://api.line.me/oauth2/v2.1/token`, params, {
      headers: headers,
    });
  }
}
