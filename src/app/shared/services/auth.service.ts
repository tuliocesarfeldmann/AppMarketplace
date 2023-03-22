import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/app/util/api-util/request-utils';
import { BehaviorSubject, map, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  private readonly CURRENT_USER = "CURRENT_USER";

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.CURRENT_USER)))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  get getToken(): any {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  get getRefreshToken(): any {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  get isLogged(): boolean {
    return !!this.getToken;
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(login: Login): Observable<Token> {
    return this.http.post<Token>(`${BASE_URL}/authenticate`, JSON.stringify(login), { headers: new HttpHeaders({'Content-Type':'application/json'}) })
      .pipe(map((resp: Token) => {
        let jwtToken = resp.jwtToken
        let refreshToken = resp.refreshToken
        let user = new User(jwtDecode(jwtToken)["user_id"],jwtDecode(jwtToken)["sub"], jwtDecode(jwtToken)["roles"])

        this.doLoginUser(user, jwtToken, refreshToken)

        return resp
      }));
  }

  refreshToken(): Observable<Token>{
    return this.http.post<Token>(`${BASE_URL}/refreshToken`, JSON.stringify({refreshToken: this.getRefreshToken}), { headers: new HttpHeaders({'Content-Type':'application/json'}) }).pipe(
      map((resp: Token) => {
        localStorage.setItem(this.JWT_TOKEN, resp.jwtToken)
        localStorage.setItem(this.REFRESH_TOKEN, resp.refreshToken)
        return resp
      })
    )
  }

  logout(){
    localStorage.clear()
    this.router.navigate(["/login"])  
  }

  userLogout(): Observable<any> {
    return this.http.post(`${BASE_URL}/logout`, JSON.stringify({ refreshToken: this.getRefreshToken }), { headers: new HttpHeaders({'Content-Type':'application/json'}) })
      .pipe(map((resp) => {
        this.logout()
        return resp
      }))
  }

  getRoles(){
    if (this.isLogged) {
      let roles = jwtDecode(localStorage.getItem(this.JWT_TOKEN))['roles'];
      return roles;
    } else {
      return [];
    }
  }

  private doLoginUser(user: User, token: string, refreshToken: string){
    localStorage.setItem(this.JWT_TOKEN, token)
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken)
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user))
    this.currentUserSubject.next(user)
  }

  public signUp(value: any): Observable<any> {
    console.log(JSON.stringify(value))
    return this.http.post(`${BASE_URL}/register`, JSON.stringify(value), { headers: new HttpHeaders({'Content-Type':'application/json'}) });
  }
  
}
