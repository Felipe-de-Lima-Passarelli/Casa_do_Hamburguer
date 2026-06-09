//Next
import { SetStateAction } from "react";

//Interface
import { ProductType } from "./Product";

export interface CartItemType {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  product: ProductType;
}

export type CartItemsContextType = {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<SetStateAction<CartItemType[]>>;
};
