import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/shared/models/offer.model';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers: [ OffersService ]
})
export class RestaurantComponent implements OnInit, OnDestroy {

  public offers: Offer[]

  private getOfferSub: Subscription

  constructor(
    private offersService: OffersService
  ) { }

  ngOnInit(): void {
    this.getOfferSub = this.offersService.getOffers({ category: "restaurante" }).subscribe({
      next: res => this.offers = res,
      error: err => console.log(err)
    })
  }

  ngOnDestroy(): void {
      this.getOfferSub.unsubscribe()
  }

}
