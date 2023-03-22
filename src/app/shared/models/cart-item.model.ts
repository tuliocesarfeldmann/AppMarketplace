import { Offer } from "./offer.model";

export class CartItem {
    public id?: number
    constructor(
        public offer: Offer,
        public amount: number
    ){}
}