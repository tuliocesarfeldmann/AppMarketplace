import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/util/api-util/request-utils';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  confirmOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${BASE_URL}/order`, order, { headers: new HttpHeaders({'Content-Type':'application/json'}) })
  }
}
