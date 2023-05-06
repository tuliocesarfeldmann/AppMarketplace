import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Offer } from 'src/app/shared/models/offer.model';
import { OffersService } from 'src/app/shared/services/offers.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Subscription } from 'rxjs';
import toaster from 'toastr';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  providers: [ OffersService ]
})
export class OfferComponent implements OnInit, OnDestroy {
  public offer: Offer

  private getOfferSub: Subscription
  
  constructor(
    private route: ActivatedRoute,
    private offerService: OffersService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getOfferSub = this.offerService.getOfferById(params['id']).subscribe({
        next: (res) => this.offer = res,
        error: (err) => console.log(err)
      })
    })
  }

  addOrder(): void {
    this.cartService.saveCartItem(this.offer).subscribe({
      next: () => toaster.success("Item adicionado ao carrinho com sucesso!")
    })
  }

  ngOnDestroy(): void {
      this.getOfferSub.unsubscribe()
  }
}
