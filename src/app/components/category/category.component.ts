import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category.model';
import { Offer } from 'src/app/shared/models/offer.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [OffersService]
})
export class CategoryComponent implements OnInit {

  public offers: Offer[]
  public category: Category

  private getOfferSub: Subscription
  private getCategorySub: Subscription

  constructor(
    private offersService: OffersService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategorySub = this.categoryService.getCategories({ path: this.router.url.replace("/","") }).subscribe({
      next: (res: Category[]) => {
        this.category = res[0] 
        this.getOffersByCategory()
      }
    })
  }

  ngOnDestroy(): void {
    this.getOfferSub.unsubscribe()
    this.getCategorySub.unsubscribe()
  }

  getOffersByCategory(): void {
    this.getOfferSub = this.offersService.getOffers({ category_id: this.category.id }).subscribe({
      next: (res: Offer[]) => this.offers = res
    })
  }

}
