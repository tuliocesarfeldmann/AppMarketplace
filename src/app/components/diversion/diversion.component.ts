import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/shared/models/offer.model';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-diversion',
  templateUrl: './diversion.component.html',
  styleUrls: ['./diversion.component.css'],
  providers: [ OffersService ]
})
export class DiversionComponent implements OnInit, OnDestroy {

  public offers: Offer[]

  private getOfferSub: Subscription

  constructor(
    private offersService: OffersService
  ) { }

  ngOnInit(): void {
    this.getOfferSub = this.offersService.getOffers({category: "diversao"}).subscribe(
      res => this.offers = res,
      err => console.log(err)
    )
  }

  ngOnDestroy(): void {
      this.getOfferSub.unsubscribe()
  }

}
