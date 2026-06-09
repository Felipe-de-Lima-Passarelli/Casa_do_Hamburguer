//Next
import { SetStateAction } from "react";

export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  category?: string;
}

export interface ProductProps extends ProductType {
  setProducts: React.Dispatch<SetStateAction<ProductType[]>>;
}
