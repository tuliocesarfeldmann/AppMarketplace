import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from 'src/app/shared/models/offer.model';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-offer-magnament',
  templateUrl: './offer-magnament.component.html',
  styleUrls: ['./offer-magnament.component.css'],
  providers: [OffersService]
})
export class OfferMagnamentComponent implements OnInit {

  public offers: Offer[] = []

  constructor(
    private offerService: OffersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.offerService.getMyOffers().subscribe({
      next: (res: Offer[]) => {
        this.offers = res
      }
    })
  }

  edit(offer: Offer): void {
    this.router.navigate([`/registerOffer/${offer.id}`])
  }

  remove(offer: Offer): void {
    this.offerService.deleteOffer(offer.id).subscribe({
      next: () => {
        let idx = this.offers.indexOf(offer)
        this.offers.splice(idx, 1)
      }
    })
  }
}
