import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { debounceTime, fromEvent, of, switchMap } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { Offer } from 'src/app/shared/models/offer.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css'
  ],
  providers: [ OffersService ]
})
export class HeaderComponent implements OnInit, AfterViewInit {


  public currentUser: string
  @ViewChild('searchOffer')
  public searchOffer: ElementRef
  public offers: Offer[]
  public categories: Category[]

  constructor(
    private authService: AuthService,
    public offerService: OffersService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue.username
    this.categoryService.getCategories().subscribe({
      next: (res: Category[]) => this.categories = res
    })
  }

  ngAfterViewInit() {
    fromEvent(this.searchOffer.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((element: any) => {
        if(element.target.value.trim() === '') {
          return of([])
        }
        return this.offerService.getOffers({description_like: element.target.value})
      })
    ).subscribe({
      next: (offers: Offer[]) => this.offers = offers,
      error: (err) => {
        console.log(err)
        return of([])
      }
    })
  }

  clearSearch(){
    this.searchOffer.nativeElement.value = ''
    this.offers = []
  }

  hasPermission(permissions: any): boolean {
    let userRoles = this.authService.getRoles()
    
    return permissions.find(p => userRoles.indexOf(p.name) >= 0) ? true : false
  }

  logout(){
    this.authService.userLogout().subscribe()
  }

}
