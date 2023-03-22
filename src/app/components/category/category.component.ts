import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/shared/models/offer.model';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [OffersService]
})
export class CategoryComponent implements OnInit {

  public offers: Offer[]

  private getOfferSub: Subscription

  constructor(
    private offersService: OffersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOfferSub = this.offersService.getOffers({ category: this.router.url.replace("/","") }).subscribe({
      next: (res: Offer[]) => this.offers = res
    })
  }

  ngOnDestroy(): void {
    this.getOfferSub.unsubscribe()
  }

}
