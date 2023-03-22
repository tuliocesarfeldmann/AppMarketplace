import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/shared/services/cart.service';
import { CartItem } from 'src/app/shared/models/cart-item.model';
import { OffersService } from 'src/app/shared/services/offers.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormPayment } from 'src/app/shared/enums/form-of-payment.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService, OffersService]
})
export class OrderComponent implements OnInit, OnDestroy {

  public cartItems: CartItem[] = []
  public form: FormGroup
  public idOrder: number
  public formOfPaymentEnum = FormPayment
  @ViewChild('content')
  private contentModal: ElementRef

  private getCartItemsSub: Subscription

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {
    this.form = this.formBuilder.group({
      address: new FormControl("", [Validators.required, Validators.minLength(5)]),
      number: new FormControl("", [Validators.required]),
      complement: new FormControl("", []),
      formOfPayment: new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getCartItemsSub = this.cartService.getCartItems().subscribe(
      (orders: CartItem[]) => {
        this.cartItems = orders
      }
    )
  }

  addAmount(item: CartItem): void {
    let findItem = this.cartItems.find((i: CartItem) => i.id === item.id)

    findItem.amount++
  }

  subAmount(item: CartItem): void {
    let findItem = this.cartItems.find((i: CartItem) => i.id === item.id)

    if (findItem.amount > 0) {
      findItem.amount === 1 ? this.removeCartItem(item) : findItem.amount--
    }
  }

  removeCartItem(item: CartItem): void {
    this.cartService.removeCartItem(item.id).subscribe(
      (item) => {
        let idx = this.cartItems.indexOf(item)
        this.cartItems.splice(idx, 1)
      }
    )
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((acum, item) => acum + (item.offer.value * item.amount), 0)
  }

  confirmOrder(): void {
    if (this.form.valid) {
      let order: Order = Object.assign({ valueTotal: this.getTotalAmount(), orderDetails: this.cartItems.map(i => ({ amount: i.amount, offer: i.offer })) }, this.form.value)

      this.orderService.confirmOrder(order).subscribe(
        (res: Order) => {
          this.idOrder = res.id

          this.cartItems.forEach((i: CartItem) => {
            this.cartService.removeCartItem(i.id).subscribe(
              () => this.cartItems = []
            )
          })

          this.modalService.open(this.contentModal, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true, backdrop: 'static' }).result.then((result) => { }, (reason) => { });
        }
      )
    } else {
      this.form.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
      this.getCartItemsSub.unsubscribe()
  }
}
