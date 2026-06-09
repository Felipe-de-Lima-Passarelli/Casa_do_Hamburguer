//Next
import { SetStateAction } from "react";
import { useEffect } from "react";

//Components
import Button from "./Button";
import CartItem from "./CartItem";

//Icons
import { IconX } from "@tabler/icons-react";
import { useCartItem } from "@/context/CartItemsContext";

//Interface
interface CartProps {
  setShowCart: React.Dispatch<SetStateAction<boolean>>;
}

const Cart = ({ setShowCart }: CartProps) => {
  const { cartItems, setCartItems } = useCartItem();

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/getitems", {
          credentials: "include",
        });

        if (!response.ok) {
          console.log("Erro ao realizar a requisição");
          return;
        }

        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCartItems();
  }, [setCartItems]);

  return (
    <div className="bg-[#F2DAAC] w-93 absolute h-screen top-0 right-0 p-5 flex flex-col gap-10 z-1">
      <div className="flex flex-row items-center justify-between">
        <IconX
          stroke={2}
          onClick={() => setShowCart(false)}
          className="cursor-pointer"
        />
        <p className="uppercase font-bold">Meu carrinho</p>
      </div>
      <div className="flex flex-col flex-1 mt-10 gap-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            title={item.product.name}
            price={item.product.price}
            img={item.product.img}
            id={item.product.id}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div onClick={() => alert("Pedido Realizado!")}>
        <Button
          bgColor="bg-[#C92A0E]"
          textColor="text-white"
          textButton="Finalizar pedido"
        />
      </div>
    </div>
  );
};

export default Cart;
