import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/models/offer.model';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OffersService ]
})
export class HomeComponent implements OnInit {

  offers: Offer[]

  constructor(
    private offersService: OffersService
  ) { }

  ngOnInit(): void {
    this.offersService.getOffers().subscribe({
      next: (offers: Offer[]) => this.offers = offers,
      error: (err) => console.log(err)
    })
  }

}
