import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { Offer } from 'src/app/shared/models/offer.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-register-offer',
  templateUrl: './register-offer.component.html',
  styleUrls: ['./register-offer.component.css'],
  providers: [OffersService]
})
export class RegisterOfferComponent implements OnInit {

  public form: FormGroup
  public categories: Category[]
  public offer: Offer = new Offer()
  public images: any[]
  public offerId: number

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OffersService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { 
    this.form = this.formBuilder.group({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      value: new FormControl("", [Validators.required]),
      details: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      images: new FormControl([], [Validators.required])
    })
   }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (res: Category[]) => this.categories = res
    })

    let id = this.route.snapshot.paramMap.get('id')

    if(id){
      this.offerService.getOfferById(Number.parseInt(id)).subscribe({
        next: (res: Offer) => {
          this.offerId = res.id
          this.form.patchValue({
            ...res
          })
          this.form.controls["images"].setValue(res.images)
          this.images = res.images
        }
      })
    }
  }

  uploadImages(imgs: any[]){
    this.form.controls["images"].setValue(imgs)
  }

  registerOffer(){
    if(this.form.valid){
      let offer: Offer = Object.assign(this.form.value, { contraste: true })
      this.offerService.saveOffer(offer).subscribe()
    } else {
      this.form.markAllAsTouched()
    }
  }

  updateOffer(){
    if(this.form.valid){
      let offer: Offer = Object.assign(this.form.value, { id: this.offerId, contraste: true })
      this.offerService.updateOffer(offer).subscribe()
    } else {
      this.form.markAllAsTouched()
    }
  }
}
