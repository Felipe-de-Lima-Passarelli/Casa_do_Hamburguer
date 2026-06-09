//Next
import Image from "next/image";

//Icons
import {
  IconArrowBadgeLeftFilled,
  IconArrowBadgeRightFilled,
  IconTrashFilled,
} from "@tabler/icons-react";

//Interface
interface CartItemProps {
  title: string;
  price: number;
  img: string;
  id: string;
  quantity: number;
}

//Utils
import { formatterPrice } from "@/Utils/FormatterPrice";

const CartItem = ({ title, price, img, id, quantity }: CartItemProps) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <Image
        src={`/img/${img}`}
        alt="Hamburguer"
        width={100}
        height={100}
        className="rounded-md"
      />
      <div className="flex-1">
        <p className="uppercase font-bold">{title}</p>
        <p className="font-bold text-[#848484]">{`R$${formatterPrice(price, quantity)}`}</p>
        <div className="flex flex-row gap-4 mt-1 items-center">
          <IconArrowBadgeLeftFilled
            size={30}
            className="cursor-pointer p-1 rounded-md bg-[#C92A0E] text-white"
          />
          <p className="font-bold">{quantity}</p>
          <IconArrowBadgeRightFilled
            size={30}
            className="cursor-pointer p-1 rounded-md bg-[#C92A0E] text-white"
          />
        </div>
      </div>
      <IconTrashFilled className="cursor-pointer" onClick={() => alert(id)} />
    </div>
  );
};

export default CartItem;
