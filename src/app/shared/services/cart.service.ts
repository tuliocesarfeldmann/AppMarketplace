import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BASE_URL } from 'src/app/util/api-util/request-utils';
import { Offer } from '../models/offer.model';
import { CartItem } from '../models/cart-item.model';
import { AuthService } from './auth.service';
import { buildParams } from 'src/app/util/api-util/request-utils';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }
  
  getCartItems(params: Object = {}): Observable<CartItem[]> {
    let searchParams = Object.entries(params)

    return this.http.get<CartItem[]>(`${BASE_URL}/cart${buildParams(searchParams)}`)
  }

  saveCartItem(offer: Offer): Observable<any> {
    return this.http.post(`${BASE_URL}/cart`, new CartItem(offer, 1))
  }

  removeCartItem(id: number): Observable<any>{
    return this.http.delete(`${BASE_URL}/cart/${id}`)
  }
}
