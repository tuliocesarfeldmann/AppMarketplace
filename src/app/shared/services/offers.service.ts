import { Offer } from "../models/offer.model"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { buildParams, BASE_URL } from "src/app/util/api-util/request-utils";

@Injectable()
export class OffersService {
    
    constructor(
        public http: HttpClient
    ){}

    getOfferById(id: number): Observable<Offer> {
        return this.http.get<Offer>(`${BASE_URL}/offer/${id}`)
    }

    getOffers(params: Object = {}): Observable<Offer[]> {
        let searchParams = Object.entries(params)

        return this.http.get<Offer[]>(`${BASE_URL}/offer${buildParams(searchParams)}`, { headers: new HttpHeaders({'Content-Type':'application/json'}) })
    }

    getMyOffers(): Observable<Offer[]> {
        return this.http.get<Offer[]>(`${BASE_URL}/offer/my-offers`, { headers: new HttpHeaders({'Content-Type':'application/json'}) })
    }

    saveOffer(offer: Offer): Observable<Offer> {
        return this.http.post<Offer>(`${BASE_URL}/offer`, offer, { headers: new HttpHeaders({'Content-Type':'application/json'}) })
    }

    updateOffer(offer: Offer): Observable<Offer> {
        return this.http.put<Offer>(`${BASE_URL}/offer`, offer, { headers: new HttpHeaders({'Content-Type':'application/json'}) })
    }

    deleteOffer(id: number): Observable<any> {
        return this.http.delete(`${BASE_URL}/offer/${id}`)
    }
}